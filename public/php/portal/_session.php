<?php
/**
 * Shared session bootstrap for the customer portal. Uses its own session
 * name (distinct from the admin dashboard's) so a browser can't confuse the
 * two if someone is signed into both at once.
 */

$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

session_name('mtva_customer');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => $isHttps
]);
session_start();

function customer_logged_in(): bool
{
    return !empty($_SESSION['customer_id']);
}

function customer_require_login(): void
{
    if (!customer_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

function h($value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

/** One CSRF token per session, reused across all forms rendered in it. */
function customer_csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

/** Call at the top of every state-changing POST handler. Exits with 403 on mismatch. */
function customer_csrf_verify(): void
{
    $submitted = (string) ($_POST['csrf'] ?? '');
    if ($submitted === '' || empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $submitted)) {
        http_response_code(403);
        exit('Invalid or expired form submission — please refresh the page and try again.');
    }
}
