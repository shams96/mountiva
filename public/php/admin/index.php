<?php
require __DIR__ . '/_session.php';
require __DIR__ . '/../_db.php';

admin_require_login();

$pdo = db_connect();
if (!$pdo) {
    http_response_code(500);
    ?>
    <!doctype html><html lang="en"><head><meta charset="utf-8"><title>Mountiva — Admin</title></head>
    <body style="font-family: ui-sans-serif, system-ui, sans-serif; padding: 3rem; max-width: 640px; margin: 0 auto;">
      <h1>Database not connected</h1>
      <p>public/php/_config.php is missing or its DB_* values are wrong. Copy
      <code>_config.example.php</code> to <code>_config.php</code>, fill in the
      MySQL credentials from hPanel, and run <code>schema.sql</code> once in
      phpMyAdmin.</p>
      <p><a href="logout.php">Log out</a></p>
    </body></html>
    <?php
    exit;
}

// Status updates (both tables share the same form action).
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'update_status') {
    admin_csrf_verify();
    $isContact = ($_POST['table'] ?? '') === 'contact';
    $table = $isContact ? 'contact_messages' : 'wholesale_enquiries';
    $allowed = $isContact ? ['new', 'read', 'replied'] : ['new', 'contacted', 'won', 'lost'];
    $status = (string) ($_POST['status'] ?? '');
    $id = (int) ($_POST['id'] ?? 0);

    if ($id > 0 && in_array($status, $allowed, true)) {
        $stmt = $pdo->prepare("UPDATE {$table} SET status = :status WHERE id = :id");
        $stmt->execute([':status' => $status, ':id' => $id]);
    }
    header('Location: index.php?tab=' . ($isContact ? 'contact' : 'wholesale'));
    exit;
}

// Provision a portal login for a wholesale enquiry's contact. The generated
// password is shown exactly once (session flash) — relay it to the customer
// yourself (call/WhatsApp/email); it's not stored anywhere after this.
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'create_account') {
    admin_csrf_verify();
    $enquiryId = (int) ($_POST['id'] ?? 0);
    $result = $enquiryId > 0 ? db_provision_customer_from_enquiry($enquiryId) : ['ok' => false, 'error' => 'bad_request'];
    $_SESSION['flash_account'] = $result;
    header('Location: index.php?tab=wholesale');
    exit;
}

$flashAccount = $_SESSION['flash_account'] ?? null;
unset($_SESSION['flash_account']);

$tab = ($_GET['tab'] ?? 'wholesale') === 'contact' ? 'contact' : 'wholesale';

$wholesale = $pdo->query('SELECT * FROM wholesale_enquiries ORDER BY created_at DESC LIMIT 300')->fetchAll();
$contacts = $pdo->query('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 300')->fetchAll();

$wholesaleNewCount = count(array_filter($wholesale, fn($r) => $r['status'] === 'new'));
$contactNewCount = count(array_filter($contacts, fn($r) => $r['status'] === 'new'));
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Mountiva — Admin</title>
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
  header h1 { font-size: 1rem; margin: 0; letter-spacing: 0.04em; }
  header a { color: #555A52; text-decoration: none; font-size: 0.85rem; }
  header a:hover { color: #15181A; text-decoration: underline; }
  main { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
  nav.tabs { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; }
  nav.tabs a {
    padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-size: 0.85rem;
    color: #555A52; border: 1px solid transparent;
  }
  nav.tabs a.active { background: #15181A; color: #FAFAF7; }
  nav.tabs a:not(.active) { border-color: #E0E1DB; }
  .badge {
    display: inline-block; min-width: 1.1rem; padding: 0 0.35rem; margin-left: 0.35rem;
    background: #D42E24; color: #fff; border-radius: 999px; font-size: 0.7rem; text-align: center;
  }
  .table-wrap { background: #FFFFFF; border: 1px solid #E0E1DB; border-radius: 4px; overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; white-space: nowrap; }
  th, td { text-align: left; padding: 0.6rem 0.8rem; border-bottom: 1px solid #EFF1EE; font-size: 0.82rem; }
  th { color: #94978F; text-transform: uppercase; font-size: 0.68rem; letter-spacing: 0.06em; font-weight: 500; }
  tr:last-child td { border-bottom: none; }
  td.message { white-space: normal; max-width: 320px; color: #555A52; }
  .empty { padding: 2.5rem; text-align: center; color: #94978F; }
  select {
    font-size: 0.78rem; padding: 0.3rem 0.4rem; border-radius: 4px; border: 1px solid #E0E1DB; background: #FFFFFF;
  }
  .status-new { color: #D42E24; font-weight: 600; }
  .status-contacted, .status-read { color: #245A6B; }
  .status-won, .status-replied { color: #3A5647; }
  .status-lost { color: #94978F; }
  a.mailto { color: #245A6B; text-decoration: none; }
  a.mailto:hover { text-decoration: underline; }
  .flash {
    margin-bottom: 1.25rem; padding: 0.9rem 1.1rem; border-radius: 4px; font-size: 0.85rem;
  }
  .flash-ok { background: #E0EEEC; border: 1px solid rgba(60,140,139,0.35); color: #1c4a49; }
  .flash-error { background: #FBE7E5; border: 1px solid rgba(212,46,36,0.3); color: #7a1410; }
  .flash code {
    background: rgba(0,0,0,0.06); padding: 0.1rem 0.4rem; border-radius: 3px; font-size: 0.85em;
  }
  button.link-btn {
    background: none; border: none; padding: 0; color: #245A6B; font-size: 0.8rem;
    text-decoration: underline; cursor: pointer; font-family: inherit;
  }
  button.link-btn:hover { color: #15181A; }
  .account-linked { color: #94978F; font-size: 0.78rem; }
</style>
</head>
<body>
<header>
  <h1>MOUNTIVA — ADMIN</h1>
  <a href="logout.php">Log out</a>
</header>
<main>
  <nav class="tabs">
    <a href="?tab=wholesale" class="<?= $tab === 'wholesale' ? 'active' : '' ?>">
      Wholesale enquiries<?php if ($wholesaleNewCount) : ?><span class="badge"><?= $wholesaleNewCount ?></span><?php endif; ?>
    </a>
    <a href="?tab=contact" class="<?= $tab === 'contact' ? 'active' : '' ?>">
      Contact messages<?php if ($contactNewCount) : ?><span class="badge"><?= $contactNewCount ?></span><?php endif; ?>
    </a>
  </nav>

  <?php if ($tab === 'wholesale'): ?>
    <?php if ($flashAccount): ?>
      <?php if (!empty($flashAccount['ok']) && !empty($flashAccount['temporaryPassword'])): ?>
        <div class="flash flash-ok">
          Portal account created. Temporary password (shown once —
          relay it to the customer yourself, it is not stored anywhere):
          <code><?= h($flashAccount['temporaryPassword']) ?></code>.
          Portal: <code>/php/portal/login.php</code>. They'll be asked to set
          their own password on first login.
        </div>
      <?php elseif (!empty($flashAccount['ok']) && !empty($flashAccount['alreadyExisted'])): ?>
        <div class="flash flash-ok">This enquiry is already linked to a portal account.</div>
      <?php else: ?>
        <div class="flash flash-error">Could not create the account — check the database connection and try again.</div>
      <?php endif; ?>
    <?php endif; ?>
    <div class="table-wrap">
      <?php if (!$wholesale): ?>
        <p class="empty">No wholesale enquiries yet.</p>
      <?php else: ?>
        <table>
          <thead>
            <tr>
              <th>Received</th><th>Company</th><th>Contact</th><th>Phone</th>
              <th>Location</th><th>Type</th><th>Formats</th><th>Vol./mo</th>
              <th>Label</th><th>Message</th><th>Account</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($wholesale as $r): ?>
              <tr>
                <td><?= h(date('d M Y, H:i', strtotime($r['created_at']))) ?></td>
                <td><?= h($r['company']) ?></td>
                <td>
                  <?= h($r['name']) ?><?= $r['role'] ? ' — ' . h($r['role']) : '' ?><br>
                  <a class="mailto" href="mailto:<?= h($r['email']) ?>"><?= h($r['email']) ?></a>
                </td>
                <td><?= h($r['phone']) ?></td>
                <td><?= h($r['city']) ?>, <?= h($r['country']) ?></td>
                <td><?= h($r['business_type']) ?></td>
                <td><?= h($r['formats']) ?></td>
                <td><?= h(number_format((float) $r['monthly_volume'])) ?></td>
                <td><?= $r['private_label'] ? 'Yes' : '—' ?></td>
                <td class="message"><?= h($r['message']) ?></td>
                <td>
                  <?php if (!empty($r['customer_id'])): ?>
                    <span class="account-linked">✓ Linked</span>
                  <?php else: ?>
                    <form method="post">
                      <input type="hidden" name="csrf" value="<?= h(admin_csrf_token()) ?>">
                      <input type="hidden" name="action" value="create_account">
                      <input type="hidden" name="id" value="<?= (int) $r['id'] ?>">
                      <button type="submit" class="link-btn">Create account</button>
                    </form>
                  <?php endif; ?>
                </td>
                <td>
                  <form method="post">
                    <input type="hidden" name="csrf" value="<?= h(admin_csrf_token()) ?>">
                    <input type="hidden" name="action" value="update_status">
                    <input type="hidden" name="table" value="wholesale">
                    <input type="hidden" name="id" value="<?= (int) $r['id'] ?>">
                    <select name="status" class="status-<?= h($r['status']) ?>" onchange="this.form.submit()">
                      <?php foreach (['new', 'contacted', 'won', 'lost'] as $opt): ?>
                        <option value="<?= $opt ?>" <?= $opt === $r['status'] ? 'selected' : '' ?>><?= ucfirst($opt) ?></option>
                      <?php endforeach; ?>
                    </select>
                  </form>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>
  <?php else: ?>
    <div class="table-wrap">
      <?php if (!$contacts): ?>
        <p class="empty">No contact messages yet.</p>
      <?php else: ?>
        <table>
          <thead>
            <tr><th>Received</th><th>Name</th><th>Email</th><th>Company</th><th>Message</th><th>Status</th></tr>
          </thead>
          <tbody>
            <?php foreach ($contacts as $r): ?>
              <tr>
                <td><?= h(date('d M Y, H:i', strtotime($r['created_at']))) ?></td>
                <td><?= h($r['name']) ?></td>
                <td><a class="mailto" href="mailto:<?= h($r['email']) ?>"><?= h($r['email']) ?></a></td>
                <td><?= h($r['company']) ?></td>
                <td class="message"><?= h($r['message']) ?></td>
                <td>
                  <form method="post">
                    <input type="hidden" name="csrf" value="<?= h(admin_csrf_token()) ?>">
                    <input type="hidden" name="action" value="update_status">
                    <input type="hidden" name="table" value="contact">
                    <input type="hidden" name="id" value="<?= (int) $r['id'] ?>">
                    <select name="status" class="status-<?= h($r['status']) ?>" onchange="this.form.submit()">
                      <?php foreach (['new', 'read', 'replied'] as $opt): ?>
                        <option value="<?= $opt ?>" <?= $opt === $r['status'] ? 'selected' : '' ?>><?= ucfirst($opt) ?></option>
                      <?php endforeach; ?>
                    </select>
                  </form>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>
  <?php endif; ?>
</main>
</body>
</html>
