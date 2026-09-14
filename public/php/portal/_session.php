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
