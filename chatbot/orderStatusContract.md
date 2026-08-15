# Order Status API — Contract

**Status:** Reflects the actual backend implementation in PR #22
(`backend/src/server.js`), verified directly against the source code.
Previously this file proposed a different shape before the real API
existed — this version replaces that proposal with the real contract.

## Endpoint
Example: `GET /orders/NS1042`

## Successful response (HTTP 200)

```json
{
  "orderId": "NS1042",
  "status": "shipped",
  "deliveryDate": "2026-08-20"
}
```

## Order not found (HTTP 404)

```json
{
  "error": "Order not found"
}
```

## Server error (HTTP 500)

```json
{
  "error": "Something went wrong"
}
```

## Notes

- This replaces an earlier draft contract that used a different shape
  (`{ found, status, expectedDelivery }`). That was a reasonable proposal
  made before the backend existed, but the real implementation differs
  slightly (uses HTTP status codes instead of a `found` boolean, and
  `orderId`/`deliveryDate` instead of `expectedDelivery`). This document
  now reflects reality.
- The chatbot-side mock (`mockOrderService.js`) has been updated to
  mirror this exact shape, so no further contract changes should be
  needed once the real backend is connected — only swapping which file
  is imported.