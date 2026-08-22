# Thunderbot

![status](https://img.shields.io/badge/status-live-brightgreen)
![node](https://img.shields.io/badge/node.js-Express-339933)
![postgres](https://img.shields.io/badge/database-PostgreSQL-336791)
![team](https://img.shields.io/badge/team-5%20engineers-orange)

> **Northstar Support Deflection MVP** - a customer-support chatbot
> built by a 5-person team for PLP Group 90's Northstar Sprint.

Northstar Retail Co.'s support team was drowning in repetitive
order-status and returns/refunds questions. Thunderbot answers both,
live, through a real chatbot backed by a real database - no mocked
replies in production.

## What It Does

A customer types a question in plain language. Thunderbot detects
whether it's about an order, a return, or a refund, and either
answers directly from live data or walks them through next steps.

    "Where is my order?"       -> looks up real order status
    "How do I return this?"    -> starts a return flow
    "When will I get my refund?" -> refund status guidance

## Architecture

    Customer message
          |
    Frontend chat UI -> POST /chat
          |
    Chatbot intent detection (keyword-based, tested against 15+
    example messages + regression cases)
          |
       |- ORDER_STATUS  -> GET /orders/:id (live PostgreSQL lookup)
       |- RETURN_REQUEST/REFUND_STATUS -> POST /api/returns/check
       |- UNKNOWN -> graceful fallback, never crashes
          |
    Reply displayed in chat UI

Full system design: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
Live vs. limitation breakdown: [`docs/INTEGRATION_STATUS.md`](./docs/INTEGRATION_STATUS.md)

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Frontend | Vanilla HTML/CSS/JS |
| Chatbot | Keyword-based intent detection (no LLM - deliberate, testable MVP choice) |

## Project Structure

    backend/
      src/
        server.js              - Express server, all live endpoints
        routes/
          chatRoutes.js         - POST /chat
          returnRoutes.js        - POST /api/returns/check
        services/
          returnService.js       - return eligibility logic
          refundService.js       - refund eligibility logic
        init-db.sql             - database schema + seed data
    chatbot/
      intentDetector.js         - classifies customer messages
      responseHandler.js         - generates replies, calls backend for real data
      orderService.js            - real HTTP client to GET /orders/:id
    frontend/
      script.js                 - chat UI, wired to the real /chat endpoint
    docs/
      ARCHITECTURE.md            - full system design and contracts
      INTEGRATION_STATUS.md       - what's live, what's a known limitation
      schema.md                   - database schema and local setup

## Running It Locally

    cd backend
    npm install
    # create .env from .env.example
    psql -U postgres -c "CREATE DATABASE thunderbot;"
    psql -U postgres -d thunderbot -f src/init-db.sql
    node src/server.js

Verify with `GET http://localhost:3000/health`. Full setup detail:
[`docs/schema.md`](./docs/schema.md)

## Team - PLP Group 90

| Role | Engineer |
|---|---|
| Backend / Database | [Joseph Wakaro](https://github.com/josephwakaro) |
| Returns / Business Logic | [Josephleme](https://github.com/Josephleme) |
| AI / Chatbot | [Faith Ogaro](https://github.com/Msfay254) |
| Frontend / UX | [Koketso Matobako](https://github.com/tweety-KM) |
| Integration / QA / DevOps | [Bernard Abuto](https://github.com/benardabuto081) |

## Known Limitations

Full detail in [`docs/INTEGRATION_STATUS.md`](./docs/INTEGRATION_STATUS.md).
In short: returns validate against submitted item details rather
than a live order lookup, and there's no multi-turn conversation
memory yet - both documented, non-blocking simplifications for this
MVP.

## Context

Built in one week for PLP's Northstar Sprint: a working simulation
grading genuine collaborative engineering - task-to-commit
traceability, balanced contribution, and process discipline, not
just a working demo.
