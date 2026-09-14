<?php
require __DIR__ . '/_session.php';
require __DIR__ . '/../_db.php';

customer_require_login();

$mustChange = !empty($_SESSION['must_change_password']);
$error = '';
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    customer_csrf_verify();
    $current = (string) ($_POST['current_password'] ?? '');
    $new = (string) ($_POST['new_password'] ?? '');
    $confirm = (string) ($_POST['confirm_password'] ?? '');

    $pdo = db_connect();
    $customer = $pdo ? db_find_customer_by_email($pdo, $_SESSION['customer_email'] ?? '') : null;

    if (!$customer || !password_verify($current, $customer['password_hash'])) {
        $error = 'Current password is incorrect.';
    } elseif (strlen($new) < 8) {
        $error = 'New password must be at least 8 characters.';
    } elseif ($new !== $confirm) {
        $error = 'New password and confirmation do not match.';
    } else {
        db_update_customer_password((int) $_SESSION['customer_id'], $new);
        unset($_SESSION['must_change_password']);
        $success = true;
    }
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Mountiva — Change password</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #FAFAF7; color: #15181A;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  .card {
    width: 100%; max-width: 380px; background: #FFFFFF; border: 1px solid #E0E1DB;
    border-radius: 4px; padding: 2rem; box-shadow: 0 1px 2px rgba(14,14,13,0.04), 0 8px 24px -12px rgba(14,14,13,0.12);
  }
  h1 { font-size: 1.05rem; margin: 0 0 0.35rem; }
  p.sub { margin: 0 0 1.25rem; font-size: 0.8rem; color: #94978F; }
  label { display: block; font-size: 0.8rem; color: #555A52; margin-bottom: 0.4rem; }
  input {
    width: 100%; padding: 0.65rem 0.75rem; border: 1px solid #E0E1DB; border-radius: 4px;
    font-size: 0.95rem; margin-bottom: 1rem;
  }
  button {
    width: 100%; padding: 0.7rem; background: #15181A; color: #FAFAF7; border: none;
    border-radius: 4px; font-size: 0.9rem; cursor: pointer;
  }
  .error {
    background: #FBE7E5; color: #7a1410; border: 1px solid rgba(212,46,36,0.3);
    padding: 0.6rem 0.75rem; border-radius: 4px; font-size: 0.85rem; margin-bottom: 1rem;
  }
  .success {
    background: #E0EEEC; color: #1c4a49; border: 1px solid rgba(60,140,139,0.35);
    padding: 0.6rem 0.75rem; border-radius: 4px; font-size: 0.85rem; margin-bottom: 1rem;
  }
  a { color: #245A6B; font-size: 0.85rem; }
</style>
</head>
<body>
  <div class="card">
    <h1>Change password</h1>
    <p class="sub"><?= $mustChange ? 'Set your own password to continue.' : 'Update your portal password.' ?></p>
    <?php if ($error): ?><p class="error"><?= h($error) ?></p><?php endif; ?>
    <?php if ($success): ?>
      <p class="success">Password updated.</p>
      <p><a href="index.php">Back to your enquiries →</a></p>
    <?php else: ?>
      <form method="post" autocomplete="off">
        <input type="hidden" name="csrf" value="<?= h(customer_csrf_token()) ?>">
        <label for="current_password">Current password</label>
        <input id="current_password" name="current_password" type="password" required>
        <label for="new_password">New password</label>
        <input id="new_password" name="new_password" type="password" minlength="8" required>
        <label for="confirm_password">Confirm new password</label>
        <input id="confirm_password" name="confirm_password" type="password" minlength="8" required>
        <button type="submit">Update password</button>
      </form>
    <?php endif; ?>
  </div>
</body>
</html>
