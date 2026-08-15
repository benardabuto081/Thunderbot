# Database Schema — Thunderbot

Database: PostgreSQL
Database name: thunderbot

## Tables

### customers
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PRIMARY KEY | Auto-incrementing customer ID |
| name | VARCHAR(100) NOT NULL | Customer full name |
| email | VARCHAR(100) NOT NULL | Customer email |

### orders
| Column | Type | Notes |
|---|---|---|
| id | VARCHAR(20) PRIMARY KEY | Order ID, e.g. NS1042 |
| customer_id | INTEGER REFERENCES customers(id) | Links order to a customer |
| status | VARCHAR(50) NOT NULL | e.g. shipped, processing, delivered |
| delivery_date | DATE | Expected or actual delivery date |

### returns
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PRIMARY KEY | Auto-incrementing return ID |
| order_id | VARCHAR(20) REFERENCES orders(id) | Links return to an order |
| reason | VARCHAR(255) | Reason for return |
| status | VARCHAR(50) NOT NULL DEFAULT pending | pending, approved, rejected |

## Relationships

- One customer can have many orders (one-to-many)
- One order can have one return (one-to-one, for MVP scope)

## Sample Data

- Customer: Jane Wanjiru (id 1)
- Order: NS1042, linked to customer 1, status shipped, delivery_date 2026-08-20
- Return: linked to order NS1042, reason Item arrived damaged, status pending

## Setup Instructions

These steps let any engineer initialize the database locally and run the backend.

1. Ensure PostgreSQL is installed and running locally.
2. Create the database:
   psql -U postgres -c "CREATE DATABASE thunderbot;"
3. Run the initialization script to create tables and insert sample data:
   psql -U postgres -d thunderbot -f backend/src/init-db.sql
4. Copy the environment template and fill in your local PostgreSQL password:
   copy backend\.env.example backend\.env
   (then edit backend\.env and replace your_password_here with your real local password)
5. Install backend dependencies:
   cd backend
   npm install
6. Start the server:
   node src/server.js
7. Verify:
   GET http://localhost:3000/health should return 200 {"status":"ok"}
   GET http://localhost:3000/orders/NS1042 should return 200 with order details
   GET http://localhost:3000/orders/FAKE999 should return 404

Note: backend/.env is intentionally excluded from Git via .gitignore and must never be committed.
