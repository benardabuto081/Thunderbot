# Order Status API — Expected Contract

**Status:** Draft — written by the Chatbot Engineer (Faith) ahead of backend
implementation, so the Backend Engineer (josephwakaro) can build Issue #5
knowing what shape the chatbot expects. Open to discussion/change.

## What the chatbot needs

When a customer asks about their order (e.g. "Where is my order?"), the
chatbot will ask for an order ID, then needs to call a function to look
up that order's status.

## Expected function signature

```js
getOrderStatus(orderId: string)
```

## Expected successful response shape

```json
{
  "found": true,
  "status": "shipped",
  "expectedDelivery": "2026-08-16"
}
```

## Expected "not found" response shape

```json
{
  "found": false,
  "reason": "No order found with that ID."
}
```

## Why this shape

- `found` lets the chatbot distinguish "valid order, here's the status"
  from "invalid/unknown order ID" without relying on error codes or
  exceptions — keeps the chatbot's response logic simple and predictable.
- `status` and `expectedDelivery` are the two facts the chatbot actually
  needs to answer a customer's question. Any extra fields (e.g. full
  shipping address, item list) aren't needed by the chatbot and can be
  omitted from what it receives, though the backend/database may of
  course store more.

## Notes

- This is a starting proposal, not a final decision — happy to adjust
  once the Backend Engineer starts building Issue #5.
- Until this function exists for real, the chatbot uses a local mock
  (see `mockOrderService.js`) that returns fake data in this exact shape,
  so chatbot logic can be built and tested independently.