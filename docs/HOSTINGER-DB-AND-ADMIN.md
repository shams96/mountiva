# Hostinger database + admin dashboard

Wholesale enquiries and contact messages are now stored in MySQL, not just
emailed — the PHP form handlers (`public/php/wholesale.php`,
`public/php/contact.php`) write to the database *and* send the notification
email; either succeeding is enough, so a bounced email no longer means a
lost lead. A small admin page at `/php/admin/` lists everything and lets you
mark status. From there you can also turn a wholesale enquiry into a
customer portal account, so the customer can log in and see their own
enquiry history at `/php/portal/`.

This only applies to the Hostinger static-export deploy path (see
`docs/../scripts/build-static.mjs`) — the Next.js API routes under
`src/app/api/` are unrelated and untouched.

## One-time setup

1. **Create the database.** hPanel → Websites → your site → Databases →
   MySQL Databases → create one. Note the database name, username, password
   and host (usually `localhost`).
2. **Create the tables.** phpMyAdmin (linked from the same hPanel page) →
   select your database → SQL tab → paste the contents of
   `public/php/schema.sql` → Go. Creates `wholesale_enquiries`,
   `contact_messages`, and `customers` (portal accounts). If you already ran
   an older `schema.sql` on a live database before the customer portal
   existed, run `public/php/migration-customer-portal.sql` once instead —
   it only adds what's missing.
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

## Customer portal

There is no public signup — accounts are only created by you, from the
**Wholesale enquiries** tab:

1. Find the enquiry for the customer you want to give portal access to,
   click **Create account** in the Account column.
2. A banner shows a one-time temporary password (10 random hex characters).
   It is never stored anywhere and never shown again — copy it now and send
   it to the customer yourself (call, WhatsApp, email — whatever you'd
   normally use).
3. The customer signs in at `/php/portal/login.php` with their enquiry
   email and that password. First login forces them to set their own
   password before they can see anything else.
4. Once set, they see every wholesale enquiry linked to their account —
   including new ones submitted later from the same email address, which
   link automatically (no need to click "Create account" again).

If a customer's enquiry email already has an account, "Create account" just
links the enquiry to it instead of creating a duplicate — safe to click
more than once.

## Notes

- `public/php/.htaccess` blocks direct HTTP access to the `_*.php` helper
  files and any `.sql` file — they're only ever `require`d server-side.
- If `_config.php` is missing or the DB credentials are wrong, the forms
  silently fall back to email-only (unchanged from before) and the admin
  page shows a clear "database not connected" message instead of erroring.
- The admin password is a single shared secret (no per-user accounts) — fine
  for one or two people checking enquiries. If more people need access with
  separate logins later, that's a bigger change (a real users table).
- Admin and customer-portal sessions use different cookie names
  (`PHPSESSID` vs `mtva_customer`), so being signed into one doesn't affect
  the other, even in the same browser.
- The whole DB + admin + portal stack was verified end-to-end against real
  MySQL + PHP (disposable Docker containers, real `schema.sql` and PHP
  files, no mocking) before this shipped.
