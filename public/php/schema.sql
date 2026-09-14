-- Mountiva — Hostinger MySQL schema
-- Run this once against the database you create in hPanel → Databases →
-- MySQL Databases (phpMyAdmin → your database → Import, or paste into the
-- SQL tab and run). Safe to re-run — tables are only created if missing.

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

CREATE TABLE IF NOT EXISTS wholesale_enquiries (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_id INT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(120) NOT NULL,
  company VARCHAR(160) NOT NULL,
  role VARCHAR(120) NOT NULL DEFAULT '',
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  country VARCHAR(80) NOT NULL,
  city VARCHAR(120) NOT NULL,
  business_type VARCHAR(40) NOT NULL,
  formats VARCHAR(255) NOT NULL,
  monthly_volume DECIMAL(12, 2) NOT NULL,
  private_label TINYINT(1) NOT NULL DEFAULT 0,
  message TEXT NULL,
  status ENUM('new', 'contacted', 'won', 'lost') NOT NULL DEFAULT 'new',
  INDEX idx_wholesale_created_at (created_at),
  CONSTRAINT fk_wholesale_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(200) NOT NULL,
  company VARCHAR(160) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied') NOT NULL DEFAULT 'new',
  INDEX idx_contact_created_at (created_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
