# Hostinger database + admin dashboard

Wholesale enquiries and contact messages are now stored in MySQL, not just
emailed — the PHP form handlers (`public/php/wholesale.php`,
`public/php/contact.php`) write to the database *and* send the notification
email; either succeeding is enough, so a bounced email no longer means a
lost lead. A small admin page at `/php/admin/` lists everything and lets you
mark status.

This only applies to the Hostinger static-export deploy path (see
`docs/../scripts/build-static.mjs`) — the Next.js API routes under
`src/app/api/` are unrelated and untouched.

## One-time setup

1. **Create the database.** hPanel → Websites → your site → Databases →
   MySQL Databases → create one. Note the database name, username, password
   and host (usually `localhost`).
2. **Create the tables.** phpMyAdmin (linked from the same hPanel page) →
   select your database → SQL tab → paste the contents of
   `public/php/schema.sql` → Go. Creates `wholesale_enquiries` and
   `contact_messages`.
3. **Set an admin password.** Locally:
   ```bash
   php -r "echo password_hash('your-chosen-password', PASSWORD_DEFAULT), PHP_EOL;"
   ```
   Copy the `$2y$...` output.
4. **Fill in `_config.php`.** Copy `public/php/_config.example.php` to
   `public/php/_config.php` and set `DB_HOST` / `DB_NAME` / `DB_USER` /
   `DB_PASS` (from step 1) and `ADMIN_PASSWORD_HASH` (from step 3).
   `_config.php` is gitignored — it never gets committed.
5. **Deploy.** `npm run build:static` copies everything under `public/`
   (including `_config.php`, if present locally) into `dist-static/`.
   Upload `dist-static/` to `public_html/` as usual. If you'd rather not
   have real credentials sitting in your local working copy at all, skip
   having `_config.php` locally and instead create it directly on the
   server via Hostinger's File Manager, inside `public_html/php/`.

## Using it

- Visit `https://mountivawater.com/php/admin/login.php` and sign in with the
  password you hashed above.
- Two tabs: **Wholesale enquiries** and **Contact messages**, newest first,
  with a red count badge for anything still `new`.
- Change the status dropdown on any row to update it in place (`new` →
  `contacted` → `won`/`lost` for wholesale; `new` → `read` → `replied` for
  contact).
- "Log out" ends the session.

## Notes

- `public/php/.htaccess` blocks direct HTTP access to the `_*.php` helper
  files and `schema.sql` — they're only ever `require`d server-side.
- If `_config.php` is missing or the DB credentials are wrong, the forms
  silently fall back to email-only (unchanged from before) and the admin
  page shows a clear "database not connected" message instead of erroring.
- The admin password is a single shared secret (no per-user accounts) — fine
  for one or two people checking enquiries. If more people need access with
  separate logins later, that's a bigger change (a real users table).
