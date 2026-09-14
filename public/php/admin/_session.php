<?php
/**
 * Shared session bootstrap for the admin pages. Cookie is HttpOnly + SameSite
 * to cut down on XSS/CSRF exposure, and Secure whenever the request already
 * arrived over HTTPS (it will on the live domain; local http testing still
 * works because the flag is conditional).
 */

$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => $isHttps
]);
session_start();

function admin_logged_in(): bool
{
    return !empty($_SESSION['mountiva_admin']);
}

function admin_require_login(): void
{
    if (!admin_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

function h($value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

/** One CSRF token per session, reused across all forms rendered in it. */
function admin_csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

/** Call at the top of every state-changing POST handler. Exits with 403 on mismatch. */
function admin_csrf_verify(): void
{
    $submitted = (string) ($_POST['csrf'] ?? '');
    if ($submitted === '' || empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $submitted)) {
        http_response_code(403);
        exit('Invalid or expired form submission — please refresh the page and try again.');
    }
}
