<?php
require __DIR__ . '/_mailer.php';
require __DIR__ . '/_db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_fail(405, 'method_not_allowed');
}

$data = read_json_body();
reject_if_bot($data);

$name = require_string($data, 'name', 120);
$company = require_string($data, 'company', 160);
$role = optional_string($data, 'role', 120);
$email = require_string($data, 'email', 200);
$phone = require_string($data, 'phone', 40);
$country = require_string($data, 'country', 80);
$city = require_string($data, 'city', 120);
$businessType = require_string($data, 'businessType', 40);
$formats = is_array($data['formats'] ?? null) ? $data['formats'] : [];
$monthlyVolume = $data['monthlyVolume'] ?? null;
$privateLabel = !empty($data['privateLabel']);
$message = optional_string($data, 'message', 4000);
$consent = !empty($data['consent']);

if (!is_valid_email($email)) {
    json_fail(422, 'validation', ['field' => 'email']);
}
if (count($formats) < 1) {
    json_fail(422, 'validation', ['field' => 'formats']);
}
if (!is_numeric($monthlyVolume) || (float) $monthlyVolume <= 0) {
    json_fail(422, 'validation', ['field' => 'monthlyVolume']);
}
if (!$consent) {
    json_fail(422, 'validation', ['field' => 'consent']);
}

$formatsList = implode(', ', array_map('strval', $formats));

$stored = db_insert_wholesale_enquiry([
    'name' => $name,
    'company' => $company,
    'role' => $role,
    'email' => $email,
    'phone' => $phone,
    'country' => $country,
    'city' => $city,
    'businessType' => $businessType,
    'formats' => $formatsList,
    'monthlyVolume' => $monthlyVolume,
    'privateLabel' => $privateLabel,
    'message' => $message
]);

$body = <<<TXT
New wholesale enquiry — Mountiva

Name: {$name}
Company: {$company}
Role: {$role}
Email: {$email}
Phone: {$phone}
Country: {$country}
City / delivery point: {$city}
Business type: {$businessType}
Formats of interest: {$formatsList}
Estimated monthly volume (cases): {$monthlyVolume}
Interested in private label: {$privateLabel}

Message:
{$message}

Received: {$_SERVER['REQUEST_TIME']}
TXT;

$sent = send_mail(WHOLESALE_TO, "Wholesale enquiry: {$company}", $body, $email, $name);

if (!$stored && !$sent) {
    error_log('[mountiva] wholesale.php: DB insert and mail() both failed for ' . $email);
    json_fail(502, 'send_failed');
}

if (!$sent) {
    error_log('[mountiva] wholesale.php mail() failed for ' . $email . ' (stored in DB)');
}

json_ok();
