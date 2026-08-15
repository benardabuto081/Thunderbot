# Known Limitations / Integration Status

**As of submission - Thunderbot, PLP Group 90**

This section exists so that anyone reviewing or testing this project understands exactly what is live versus simulated. We would rather be precise about this than have it discovered by testing.

| Feature | Status | Detail |
|---|---|---|
| Backend server + database | Live | Express server with PostgreSQL, schema initialized via init-db.sql |
| Health check | Live | GET /health returns 200 {"status":"ok"} |
| Order Status lookup (GET /orders/:id) | Live | Returns real order data or 404 if not found |
| Frontend chat UI | Live | Accepts user input, extracts order IDs, displays responses |
| Order ID extraction | Live, edge cases being verified | extractOrderId() handles the standard format (e.g. NS1042) |
| Chatbot response to order status queries | Simulated (disclosed) | Frontend currently uses a scripted reply, not a live backend call. Clearly disclosed in the chat reply itself: "(Demo data - live order lookup isn't connected yet.)" |
| Chatbot intent recognition | Status pending confirmation | Work may exist on an unmerged branch (feature/chatbot-intents); not yet verified as functional or merged at time of writing |
| Returns/Refund data layer | Partially built | Database table (returns) and business logic (returnService.js, refundService.js) both exist. No API route connects them yet - POST /returns is not live. |
| Chatbot to Returns integration | Not built | Depends on the above being completed first |

Why this approach: rather than rush an untested integration in the final hours before submission and risk a broken demo, we chose to clearly label what is simulated versus live. Everything marked "Live" has been independently verified against the actual code.
