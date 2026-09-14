<?php
require __DIR__ . '/_session.php';
require __DIR__ . '/../_db.php';

customer_require_login();

if (!empty($_SESSION['must_change_password'])) {
    header('Location: change-password.php');
    exit;
}

$enquiries = db_list_enquiries_for_customer((int) $_SESSION['customer_id']);
$statusLabel = ['new' => 'Received', 'contacted' => 'In discussion', 'won' => 'Confirmed', 'lost' => 'Closed'];
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Mountiva — Wholesale Portal</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: #FAFAF7; color: #15181A;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    font-size: 14px;
  }
  header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 1.5rem; background: #FFFFFF; border-bottom: 1px solid #E0E1DB;
  }
  header .brand { font-size: 1rem; letter-spacing: 0.04em; }
  header .who { font-size: 0.8rem; color: #555A52; }
  header a { color: #555A52; text-decoration: none; font-size: 0.85rem; margin-left: 1rem; }
  header a:hover { color: #15181A; text-decoration: underline; }
  main { max-width: 1000px; margin: 0 auto; padding: 1.5rem; }
  h1 { font-size: 1.3rem; margin: 0 0 0.3rem; }
  p.sub { color: #94978F; font-size: 0.85rem; margin: 0 0 1.5rem; }
  .table-wrap { background: #FFFFFF; border: 1px solid #E0E1DB; border-radius: 4px; overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; white-space: nowrap; }
  th, td { text-align: left; padding: 0.6rem 0.8rem; border-bottom: 1px solid #EFF1EE; font-size: 0.82rem; }
  th { color: #94978F; text-transform: uppercase; font-size: 0.68rem; letter-spacing: 0.06em; font-weight: 500; }
  tr:last-child td { border-bottom: none; }
  td.message { white-space: normal; max-width: 360px; color: #555A52; }
  .empty { padding: 2.5rem; text-align: center; color: #94978F; }
  .pill {
    display: inline-block; padding: 0.15rem 0.55rem; border-radius: 999px; font-size: 0.72rem; font-weight: 600;
  }
  .pill-new { background: #FBE7E5; color: #a3251d; }
  .pill-contacted { background: #E2ECEE; color: #245A6B; }
  .pill-won { background: #E6EDE7; color: #3A5647; }
  .pill-lost { background: #EFF1EE; color: #94978F; }
</style>
</head>
<body>
<header>
  <div>
    <div class="brand">MOUNTIVA — WHOLESALE PORTAL</div>
    <div class="who"><?= h($_SESSION['customer_company']) ?> — <?= h($_SESSION['customer_name']) ?></div>
  </div>
  <nav>
    <a href="change-password.php">Change password</a>
    <a href="logout.php">Log out</a>
  </nav>
</header>
<main>
  <h1>Your enquiries</h1>
  <p class="sub">Every wholesale enquiry submitted under your account, most recent first.</p>

  <div class="table-wrap">
    <?php if (!$enquiries): ?>
      <p class="empty">No enquiries on your account yet.</p>
    <?php else: ?>
      <table>
        <thead>
          <tr>
            <th>Submitted</th><th>Formats</th><th>Volume/mo</th><th>Private label</th>
            <th>Notes</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($enquiries as $r): ?>
            <tr>
              <td><?= h(date('d M Y', strtotime($r['created_at']))) ?></td>
              <td><?= h($r['formats']) ?></td>
              <td><?= h(number_format((float) $r['monthly_volume'])) ?></td>
              <td><?= $r['private_label'] ? 'Yes' : '—' ?></td>
              <td class="message"><?= h($r['message']) ?: '—' ?></td>
              <td><span class="pill pill-<?= h($r['status']) ?>"><?= h($statusLabel[$r['status']] ?? $r['status']) ?></span></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </div>
</main>
</body>
</html>
