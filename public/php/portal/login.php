<?php
require __DIR__ . '/_session.php';
require __DIR__ . '/../_db.php';

if (customer_logged_in()) {
    header('Location: index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim((string) ($_POST['email'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    $customer = ($email !== '' && $password !== '') ? db_customer_login($email, $password) : null;

    if ($customer) {
        session_regenerate_id(true);
        $_SESSION['customer_id'] = (int) $customer['id'];
        $_SESSION['customer_name'] = $customer['name'];
        $_SESSION['customer_company'] = $customer['company'];
        $_SESSION['customer_email'] = $customer['email'];
        $_SESSION['must_change_password'] = !empty($customer['must_change_password']);
        header('Location: ' . (!empty($customer['must_change_password']) ? 'change-password.php' : 'index.php'));
        exit;
    }

    // Small fixed delay — blunts naive brute-force attempts.
    usleep(400000);
    $error = 'Incorrect email or password.';
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Mountiva — Wholesale Portal sign in</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #FAFAF7; color: #15181A;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  .card {
    width: 100%; max-width: 360px; background: #FFFFFF; border: 1px solid #E0E1DB;
    border-radius: 4px; padding: 2rem; box-shadow: 0 1px 2px rgba(14,14,13,0.04), 0 8px 24px -12px rgba(14,14,13,0.12);
  }
  h1 { font-size: 1.05rem; margin: 0 0 0.35rem; letter-spacing: 0.02em; }
  p.sub { margin: 0 0 1.25rem; font-size: 0.8rem; color: #94978F; }
  label { display: block; font-size: 0.8rem; color: #555A52; margin-bottom: 0.4rem; }
  input {
    width: 100%; padding: 0.65rem 0.75rem; border: 1px solid #E0E1DB; border-radius: 4px;
    font-size: 0.95rem; margin-bottom: 1rem;
  }
  input:focus { outline: 2px solid #245A6B; outline-offset: 1px; }
  button {
    width: 100%; padding: 0.7rem; background: #15181A; color: #FAFAF7; border: none;
    border-radius: 4px; font-size: 0.9rem; cursor: pointer;
  }
  button:hover { background: #0C0F11; }
  .error {
    background: #FBE7E5; color: #7a1410; border: 1px solid rgba(212,46,36,0.3);
    padding: 0.6rem 0.75rem; border-radius: 4px; font-size: 0.85rem; margin-bottom: 1rem;
  }
</style>
</head>
<body>
  <form class="card" method="post" autocomplete="off">
    <h1>Wholesale Portal</h1>
    <p class="sub">MOUNTIVA — sign in with the details your account manager gave you.</p>
    <?php if ($error): ?><p class="error"><?= h($error) ?></p><?php endif; ?>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" autofocus required>
    <label for="password">Password</label>
    <input id="password" name="password" type="password" required>
    <button type="submit">Sign in</button>
  </form>
</body>
</html>
