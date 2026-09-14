<?php
/**
 * Site secrets template. Copy this file to `_config.php` (same folder) and
 * fill in real values — `_config.php` is gitignored, never committed, and
 * must be uploaded to Hostinger separately from the rest of dist-static
 * (or created directly on the server via File Manager) after every deploy.
 *
 * DB_* — hPanel → Databases → MySQL Databases: create a database there
 * first, note its host/name/user/password, then run schema.sql against it
 * once in phpMyAdmin to create the tables.
 *
 * ADMIN_PASSWORD_HASH — protects /php/admin/. Generate a hash locally with:
 *   php -r "echo password_hash('your-chosen-password', PASSWORD_DEFAULT), PHP_EOL;"
 * then paste the output (starts with $2y$) below. Never put the plain
 * password itself in this file.
 */

const DB_HOST = 'localhost';
const DB_NAME = 'change-me';
const DB_USER = 'change-me';
const DB_PASS = 'change-me';

const ADMIN_PASSWORD_HASH = '$2y$10$replace-with-a-real-hash';
