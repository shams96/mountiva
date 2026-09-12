<?php
require __DIR__ . '/_mailer.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_fail(405, 'method_not_allowed');
}

$data = read_json_body();
reject_if_bot($data);

$name = require_string($data, 'name', 120);
$email = require_string($data, 'email', 200);
$company = optional_string($data, 'company', 160);
$message = require_string($data, 'message', 4000);
$consent = !empty($data['consent']);

if (!is_valid_email($email)) {
    json_fail(422, 'validation', ['field' => 'email']);
}
if (mb_strlen($message) < 10) {
    json_fail(422, 'validation', ['field' => 'message']);
}
if (!$consent) {
    json_fail(422, 'validation', ['field' => 'consent']);
}

$body = <<<TXT
New contact message — Mountiva

Name: {$name}
Email: {$email}
Company: {$company}

Message:
{$message}
TXT;

$sent = send_mail(GENERAL_TO, "Contact message from {$name}", $body, $email, $name);

if (!$sent) {
    error_log('[mountiva] contact.php mail() failed for ' . $email);
    json_fail(502, 'send_failed');
}

json_ok();
