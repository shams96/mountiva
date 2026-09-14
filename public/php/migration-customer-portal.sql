-- Mountiva — Customer Portal migration
--
-- Only needed if you already ran schema.sql on a live database BEFORE the
-- customer portal existed (schema.sql's CREATE TABLE IF NOT EXISTS won't
-- retrofit an existing wholesale_enquiries table). If this is a fresh
-- database, ignore this file — schema.sql already includes everything.
--
-- Run once in phpMyAdmin → your database → SQL tab.

CREATE TABLE IF NOT EXISTS customers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(120) NOT NULL,
  company VARCHAR(160) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  must_change_password TINYINT(1) NOT NULL DEFAULT 1,
  INDEX idx_customers_email (email)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

ALTER TABLE wholesale_enquiries
  ADD COLUMN customer_id INT UNSIGNED NULL AFTER id,
  ADD CONSTRAINT fk_wholesale_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL;
