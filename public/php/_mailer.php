<?php
/**
 * Shared helpers for the static-export form handlers (wholesale.php,
 * contact.php). Plain PHP mail() — works on any shared-hosting plan
 * (Hostinger included) with no extra service or signup.
 *
 * Destination addresses are duplicated here from src/lib/site.ts because a
 * static export has no Node runtime to share that file with. Keep them in
 * sync by hand.
 */

const SITE_NAME = 'Mountiva';
const WHOLESALE_TO = 'wholesale@mountivawater.com';
const GENERAL_TO = 'hello@mountivawater.com';
// Just two real mailboxes on the domain (wholesale@ and hello@) — reuse the
// general one as the technical "From" sender address instead of requiring a
// third mailbox that's never shown to anyone.
const FROM_ADDRESS = GENERAL_TO;

header('Content-Type: application/json; charset=utf-8');
// Same-origin form posts only; adjust if the site is ever served from a
// different domain than the one sending mail.
header('X-Content-Type-Options: nosniff');

function json_fail(int $status, string $error, array $extra = []): void
{
    http_response_code($status);
    echo json_encode(array_merge(['ok' => false, 'error' => $error], $extra));
    exit;
}

function json_ok(): void
{
    echo json_encode(['ok' => true]);
    exit;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '', true);
    if (!is_array($data)) {
        json_fail(400, 'invalid_json');
    }
    return $data;
}

/** Strips header-injection characters and trims. Use on anything that ends
 *  up in a mail header (name, email, subject line). */
function clean_header_value(string $value): string
{
    $value = str_replace(["\r", "\n"], '', $value);
    return trim($value);
}

function is_valid_email(string $email): bool
{
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

/** Required, non-empty string field. */
function require_string(array $data, string $key, int $maxLen = 2000): string
{
    $v = $data[$key] ?? null;
    if (!is_string($v) || trim($v) === '') {
        json_fail(422, 'validation', ['field' => $key]);
    }
    return mb_substr(trim($v), 0, $maxLen);
}

function optional_string(array $data, string $key, int $maxLen = 2000): string
{
    $v = $data[$key] ?? '';
    if (!is_string($v)) {
        return '';
    }
    return mb_substr(trim($v), 0, $maxLen);
}

/** Honeypot: the `website` field must be present-but-empty. A filled value
 *  means a bot filled every field; accept silently and do nothing. */
function reject_if_bot(array $data): void
{
    if (!empty($data['website'] ?? '')) {
        json_ok();
    }
}

function send_mail(string $to, string $subject, string $body, string $replyToEmail, string $replyToName): bool
{
    $headers = [
        'From: ' . SITE_NAME . ' <' . FROM_ADDRESS . '>',
        'Reply-To: ' . clean_header_value($replyToName) . ' <' . clean_header_value($replyToEmail) . '>',
        'Content-Type: text/plain; charset=utf-8',
        'MIME-Version: 1.0'
    ];

    return mail($to, clean_header_value($subject), $body, implode("\r\n", $headers));
}
