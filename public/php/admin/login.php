<?php
require __DIR__ . '/_session.php';
require __DIR__ . '/../_db.php';

if (admin_logged_in()) {
    header('Location: index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = (string) ($_POST['password'] ?? '');
    if (defined('ADMIN_PASSWORD_HASH') && $password !== '' && password_verify($password, ADMIN_PASSWORD_HASH)) {
        session_regenerate_id(true);
        $_SESSION['mountiva_admin'] = true;
        header('Location: index.php');
        exit;
    }
    // Small fixed delay — blunts naive brute-force attempts without a full
    // rate-limit store, which would be overkill for a single-admin form.
    usleep(400000);
    $error = defined('ADMIN_PASSWORD_HASH')
        ? 'Incorrect password.'
        : 'Admin login is not configured yet — set ADMIN_PASSWORD_HASH in public/php/_config.php.';
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Mountiva — Admin sign in</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #FAFAF7; color: #15181A;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  .card {
    width: 100%; max-width: 340px; background: #FFFFFF; border: 1px solid #E0E1DB;
    border-radius: 4px; padding: 2rem; box-shadow: 0 1px 2px rgba(14,14,13,0.04), 0 8px 24px -12px rgba(14,14,13,0.12);
  }
  h1 { font-size: 1.05rem; margin: 0 0 1.25rem; letter-spacing: 0.02em; }
  label { display: block; font-size: 0.8rem; color: #555A52; margin-bottom: 0.4rem; }
  input[type="password"] {
    width: 100%; padding: 0.65rem 0.75rem; border: 1px solid #E0E1DB; border-radius: 4px;
    font-size: 0.95rem; margin-bottom: 1rem;
  }
  input[type="password"]:focus { outline: 2px solid #245A6B; outline-offset: 1px; }
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
    <h1>MOUNTIVA — Admin</h1>
    <?php if ($error): ?><p class="error"><?= h($error) ?></p><?php endif; ?>
    <label for="password">Password</label>
    <input id="password" name="password" type="password" autofocus required>
    <button type="submit">Sign in</button>
  </form>
</body>
</html>
