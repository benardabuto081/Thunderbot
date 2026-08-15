-- init-db.sql
-- Creates the Thunderbot schema (customers, orders, returns) and inserts sample data.
-- Run with: psql -U postgres -d thunderbot -f backend/src/init-db.sql

CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(20) PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  status VARCHAR(50) NOT NULL,
  delivery_date DATE
);

CREATE TABLE IF NOT EXISTS returns (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(20) REFERENCES orders(id),
  reason VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'pending'
);

-- Sample data
INSERT INTO customers (name, email)
VALUES ('Jane Wanjiru', 'jane.wanjiru@example.com')
ON CONFLICT DO NOTHING;

INSERT INTO orders (id, customer_id, status, delivery_date)
VALUES ('NS1042', 1, 'shipped', '2026-08-20')
ON CONFLICT (id) DO NOTHING;

INSERT INTO returns (order_id, reason, status)
VALUES ('NS1042', 'Item arrived damaged', 'pending');
