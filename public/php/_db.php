<?php
/**
 * MySQL persistence for wholesale enquiries and contact messages, alongside
 * the email notification in _mailer.php. Best-effort: if _config.php hasn't
 * been set up yet or the database is unreachable, callers fall back to
 * email-only (see wholesale.php / contact.php) rather than failing the
 * whole request. The admin dashboard (admin/index.php) reads from here.
 */

$configFile = __DIR__ . '/_config.php';
if (is_file($configFile)) {
    require_once $configFile;
}

function db_connect(): ?PDO
{
    if (!defined('DB_HOST') || !defined('DB_NAME') || !defined('DB_USER') || !defined('DB_PASS')) {
        return null;
    }
    try {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        return new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
    } catch (Throwable $e) {
        error_log('[mountiva] db_connect failed: ' . $e->getMessage());
        return null;
    }
}

function db_insert_wholesale_enquiry(array $data): bool
{
    $pdo = db_connect();
    if (!$pdo) {
        return false;
    }
    try {
        // Auto-link to an existing customer account by email, so a repeat
        // enquiry from someone already provisioned shows up in their portal
        // history without any manual step.
        $customerId = null;
        $customer = db_find_customer_by_email($pdo, $data['email']);
        if ($customer) {
            $customerId = (int) $customer['id'];
        }

        $stmt = $pdo->prepare(
            'INSERT INTO wholesale_enquiries
                (customer_id, name, company, role, email, phone, country, city, business_type, formats, monthly_volume, private_label, message)
             VALUES (:customer_id, :name, :company, :role, :email, :phone, :country, :city, :business_type, :formats, :monthly_volume, :private_label, :message)'
        );
        return $stmt->execute([
            ':customer_id' => $customerId,
            ':name' => $data['name'],
            ':company' => $data['company'],
            ':role' => $data['role'],
            ':email' => $data['email'],
            ':phone' => $data['phone'],
            ':country' => $data['country'],
            ':city' => $data['city'],
            ':business_type' => $data['businessType'],
            ':formats' => $data['formats'],
            ':monthly_volume' => $data['monthlyVolume'],
            ':private_label' => $data['privateLabel'] ? 1 : 0,
            ':message' => $data['message']
        ]);
    } catch (Throwable $e) {
        error_log('[mountiva] wholesale insert failed: ' . $e->getMessage());
        return false;
    }
}

function db_insert_contact_message(array $data): bool
{
    $pdo = db_connect();
    if (!$pdo) {
        return false;
    }
    try {
        $stmt = $pdo->prepare(
            'INSERT INTO contact_messages (name, email, company, message) VALUES (:name, :email, :company, :message)'
        );
        return $stmt->execute([
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':company' => $data['company'],
            ':message' => $data['message']
        ]);
    } catch (Throwable $e) {
        error_log('[mountiva] contact insert failed: ' . $e->getMessage());
        return false;
    }
}

/*
 * Customer portal
 * ----------------
 * Accounts are admin-provisioned only (see admin/index.php "Create account"
 * action on a wholesale enquiry) — there is no public signup. A customer
 * logs in at /php/portal/ to see their own wholesale enquiry history.
 */

function db_find_customer_by_email(PDO $pdo, string $email): ?array
{
    $stmt = $pdo->prepare('SELECT * FROM customers WHERE email = :email LIMIT 1');
    $stmt->execute([':email' => $email]);
    $row = $stmt->fetch();
    return $row ?: null;
}

/**
 * Turns a wholesale enquiry into a login-capable customer account.
 * Idempotent: if the enquiry is already linked, or a customer with that
 * email already exists, links/returns the existing account instead of
 * erroring or creating a duplicate.
 *
 * @return array{ok:bool, customerId?:int, temporaryPassword?:string, alreadyExisted?:bool, error?:string}
 */
function db_provision_customer_from_enquiry(int $enquiryId): array
{
    $pdo = db_connect();
    if (!$pdo) {
        return ['ok' => false, 'error' => 'no_db'];
    }

    try {
        $stmt = $pdo->prepare('SELECT * FROM wholesale_enquiries WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $enquiryId]);
        $enquiry = $stmt->fetch();
        if (!$enquiry) {
            return ['ok' => false, 'error' => 'not_found'];
        }

        if (!empty($enquiry['customer_id'])) {
            return ['ok' => true, 'customerId' => (int) $enquiry['customer_id'], 'alreadyExisted' => true];
        }

        $existing = db_find_customer_by_email($pdo, $enquiry['email']);
        if ($existing) {
            $link = $pdo->prepare('UPDATE wholesale_enquiries SET customer_id = :cid WHERE id = :id');
            $link->execute([':cid' => $existing['id'], ':id' => $enquiryId]);
            return ['ok' => true, 'customerId' => (int) $existing['id'], 'alreadyExisted' => true];
        }

        // 10-char readable temporary password — shown once to the admin to
        // relay to the customer; never emailed automatically (no mailer
        // wiring for credentials, deliberately — keeps this step manual).
        $temporaryPassword = substr(bin2hex(random_bytes(6)), 0, 10);
        $hash = password_hash($temporaryPassword, PASSWORD_DEFAULT);

        $pdo->beginTransaction();
        $insert = $pdo->prepare(
            'INSERT INTO customers (name, company, email, password_hash, must_change_password)
             VALUES (:name, :company, :email, :hash, 1)'
        );
        $insert->execute([
            ':name' => $enquiry['name'],
            ':company' => $enquiry['company'],
            ':email' => $enquiry['email'],
            ':hash' => $hash
        ]);
        $customerId = (int) $pdo->lastInsertId();

        $link = $pdo->prepare('UPDATE wholesale_enquiries SET customer_id = :cid WHERE id = :id');
        $link->execute([':cid' => $customerId, ':id' => $enquiryId]);
        $pdo->commit();

        return ['ok' => true, 'customerId' => $customerId, 'temporaryPassword' => $temporaryPassword];
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log('[mountiva] provision customer failed: ' . $e->getMessage());
        return ['ok' => false, 'error' => 'db_error'];
    }
}

/** Verifies a customer login. Returns the customer row (password_hash included) or null. */
function db_customer_login(string $email, string $password): ?array
{
    $pdo = db_connect();
    if (!$pdo) {
        return null;
    }
    $customer = db_find_customer_by_email($pdo, $email);
    if (!$customer || !password_verify($password, $customer['password_hash'])) {
        return null;
    }
    return $customer;
}

function db_update_customer_password(int $customerId, string $newPassword): bool
{
    $pdo = db_connect();
    if (!$pdo) {
        return false;
    }
    try {
        $stmt = $pdo->prepare(
            'UPDATE customers SET password_hash = :hash, must_change_password = 0 WHERE id = :id'
        );
        return $stmt->execute([
            ':hash' => password_hash($newPassword, PASSWORD_DEFAULT),
            ':id' => $customerId
        ]);
    } catch (Throwable $e) {
        error_log('[mountiva] customer password update failed: ' . $e->getMessage());
        return false;
    }
}

function db_list_enquiries_for_customer(int $customerId): array
{
    $pdo = db_connect();
    if (!$pdo) {
        return [];
    }
    $stmt = $pdo->prepare(
        'SELECT * FROM wholesale_enquiries WHERE customer_id = :cid ORDER BY created_at DESC'
    );
    $stmt->execute([':cid' => $customerId]);
    return $stmt->fetchAll();
}
