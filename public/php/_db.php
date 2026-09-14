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
        $stmt = $pdo->prepare(
            'INSERT INTO wholesale_enquiries
                (name, company, role, email, phone, country, city, business_type, formats, monthly_volume, private_label, message)
             VALUES (:name, :company, :role, :email, :phone, :country, :city, :business_type, :formats, :monthly_volume, :private_label, :message)'
        );
        return $stmt->execute([
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
