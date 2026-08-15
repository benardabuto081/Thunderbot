# Architecture & Interface Document
**Thunderbot — PLP Group 90 — Northstar Sprint**

## System Overview
Thunderbot is a customer-service chatbot for order status and
returns/refunds, built as a three-tier system: a static frontend chat
UI, a chatbot intent-handling layer, and a Node.js/Express backend
with PostgreSQL. As of this update, all three tiers are live and
connected end-to-end.

## Components

### Backend (backend/)
- Stack: Node.js, Express, PostgreSQL
- Entry point: backend/src/server.js
- Database: Initialized via backend/src/init-db.sql. Full schema,
  relationships, and sample data documented in docs/schema.md.
- Live endpoints:
  - GET /health - returns 200 {"status":"ok"}
  - GET /orders/:id - looks up an order by ID, returns 404 with
    { error: "Order not found" } if no match, otherwise returns
    { orderId, status, deliveryDate }
  - POST /chat - accepts { message, orderId (optional) }, runs intent
    detection, returns { intent, reply }
  - POST /api/returns/check - accepts { item, daysSinceDelivery,
    context }, returns { success, isEligible, reason, message }
    (validates on submitted data, not yet a database order lookup -
    see docs/INTEGRATION_STATUS.md)
- Middleware: express.json() (parses POST bodies), cors() (allows
  cross-origin requests from the frontend)

### Chatbot Layer (chatbot/)
- Sits between the frontend and backend, translating user messages
  into intents and generating replies.
- chatbot/intentDetector.js - keyword-based classification into
  ORDER_STATUS, RETURN_REQUEST, REFUND_STATUS, or UNKNOWN
- chatbot/responseHandler.js - generateResponse() for intent-based
  replies, generateOrderStatusReply() for real order lookups (async,
  calls orderService.js)
- chatbot/orderService.js - real HTTP client calling the backend's
  GET /orders/:id
- Exposed to the frontend via backend/src/routes/chatRoutes.js
  (POST /chat)

### Frontend (frontend/)
- Entry point: frontend/script.js, static chat UI
- Order ID extraction: extractOrderId(text) - pulls an order ID out
  of free-text user input. Expected format: letters followed by
  digits (e.g. NS1042).
- API integration: USE_REAL_API = true. callRealApi() calls the real
  POST /chat endpoint - no mock replies in normal operation.

## Data Flow (Current, Live)

    User types message
          |
    frontend/script.js -> callRealApi() -> POST /chat
          |
    backend/src/routes/chatRoutes.js
          |
    chatbot/responseHandler.js -> detectIntent()
          |
       |- ORDER_STATUS + orderId -> orderService.js -> GET /orders/:id (live DB lookup)
       |- RETURN_REQUEST/REFUND_STATUS -> clarifying reply (asks for details)
       |  (POST /api/returns/check exists and is live, but not yet
       |   called automatically by the chat flow - see
       |   docs/INTEGRATION_STATUS.md)
       |- UNKNOWN -> fallback reply
          |
    { intent, reply } returned to frontend, displayed in chat UI

## Contract Reference

Full request/response shapes for each endpoint, including error
cases, are documented in:
- chatbot/orderStatusContract.md (Order Status)
- docs/schema.md (database schema, sample data, local setup)

## Related Documents
- docs/schema.md - full database schema, relationships, sample data,
  and local setup instructions
- docs/INTEGRATION_STATUS.md - current live/limitation breakdown
