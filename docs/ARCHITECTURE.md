# Architecture & Interface Document

**Thunderbot — PLP Group 90 — Northstar Sprint**

## System Overview

Thunderbot is a customer-service chatbot for order status and returns/refunds, built as a three-tier system: a static frontend chat UI, a Node.js/Express backend with PostgreSQL, and a chatbot intent-handling layer connecting the two.

## Components

### Backend (backend/)

- Stack: Node.js, Express, PostgreSQL
- Entry point: backend/src/server.js
- Database: Initialized via backend/src/init-db.sql. Full schema, relationships, and sample data documented in docs/schema.md.
- Confirmed live endpoints:
  - GET /health - returns 200 {"status":"ok"}
  - GET /orders/:id - looks up an order by ID, returns 404 with { error: 'Order not found' } if no match, otherwise returns the order record.
- Data layer ready, route not yet exposed:
  - Database includes a returns table (order_id, reason, status - pending/approved/rejected), already created via init-db.sql. See docs/schema.md.
  - backend/src/services/returnService.js and refundService.js contain the eligibility logic.
  - No route in server.js currently connects the two. POST /returns does not yet exist as an endpoint, despite both the table and the service logic being in place.

### Chatbot Layer

- Intended to sit between the frontend chat UI and the backend, translating user messages into intents (e.g. "check my order," "start a return") and calling the relevant backend endpoint.
- Status at time of writing: unconfirmed/in progress. Intent-handling work may exist on an unmerged branch, feature/chatbot-intents.
- Issue #7 ("Connect chatbot to Order Status backend") remains open on the board, consistent with this gap.

### Frontend (frontend/)

- Entry point: frontend/script.js, static chat UI
- Order ID extraction: extractOrderId(text) - pulls an order ID out of free-text user input. Expected format: letters followed by digits (e.g. NS1042).
- API integration: callRealApi() exists and is correctly shaped to call a /chat endpoint, but is currently inactive.
  - USE_REAL_API = false
  - API_URL is a placeholder value, not a real endpoint
- Current behavior: all chat replies come from getMockBotReply(), a scripted response function. The mock order-status reply includes a visible in-chat disclosure: "(Demo data - live order lookup isn't connected yet.)"

## Data Flow (Current, Actual State)

    User types message
          |
    frontend/script.js -> extractOrderId()
          |
    getMockBotReply()  [ACTIVE - scripted reply, disclosed as demo data]
          |
    Displayed in chat UI

    callRealApi() -> /chat endpoint  [BUILT, NOT ACTIVE - USE_REAL_API is false]

## Data Flow (Intended, Once Fully Wired)

    User types message
          |
    frontend/script.js -> callRealApi() -> chatbot /chat endpoint
          |
    Chatbot intent handler determines intent
          |
       |- Order status intent -> GET /orders/:id (backend, LIVE)
       |- Returns intent      -> POST /returns (backend, NOT YET BUILT)
          |
    Response returned to frontend, displayed in chat

## Related Documents

- docs/schema.md - full database schema, relationships, sample data, and local setup instructions
- docs/INTEGRATION_STATUS.md - honest breakdown of what's live vs. simulated at submission time
