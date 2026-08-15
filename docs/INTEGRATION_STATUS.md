# Known Limitations / Integration Status
**As of submission - Thunderbot, PLP Group 90**

This section exists so that anyone reviewing or testing this project
understands exactly what is live versus simulated. We would rather be
precise about this than have it discovered by testing.

| Feature | Status | Detail |
|---|---|---|
| Backend server + database | Live | Express server with PostgreSQL, schema initialized via init-db.sql |
| Health check | Live | GET /health returns 200 {"status":"ok"} |
| Order Status lookup (GET /orders/:id) | Live | Returns real order data or 404 if not found |
| Chatbot intent recognition | Live | ORDER_STATUS, RETURN_REQUEST, REFUND_STATUS detection, tested against 15+ example messages plus regression cases |
| Chatbot /chat endpoint | Live | POST /chat accepts a message and optional orderId, returns detected intent + reply |
| Returns/Refund API (POST /api/returns/check) | Live | Validates eligibility based on submitted item/timeline data; returns eligibility, reason, and refund detail |
| CORS | Live | Cross-origin requests from the frontend to the backend are allowed |
| Frontend chat UI | Live | Accepts user input, extracts order IDs, displays responses |
| Order ID extraction | Live | extractOrderId() handles the standard format (e.g. NS1042) |
| Frontend to backend integration | Live | USE_REAL_API = true; frontend calls the real /chat endpoint, not a mock |

## Known, documented limitations (non-blocking)

- **Returns endpoint validates on submitted data, not a real order lookup.** POST /api/returns/check takes item/daysSinceDelivery directly rather than looking up a real order by order_id in the database. Flagged as a follow-up, not a blocker.
- **No multi-turn conversation state.** If a customer's first message doesn't include an order ID, the chatbot asks for it, but a follow-up message with just the order ID isn't automatically linked back to the original intent. The frontend sends message and orderId together in one request as a workaround.
- **Order-lookup DB path (200/404) verified via QA's local Postgres, not the original developer's machine**, due to an unrelated local Postgres install issue during development. Verified live against real seeded data before merge.

Why this approach: rather than rush an untested integration in the
final hours before submission and risk a broken demo, we verified
every "Live" row directly - starting the real server, calling the
real endpoints, and checking actual responses - rather than trusting
PR descriptions alone.
