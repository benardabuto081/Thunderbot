/**
 * TEMPORARY MOCK — stands in for the real backend Order Status API
 * (GET /orders/:id, implemented in PR #22 / backend/src/server.js)
 * until the chatbot is wired to make real HTTP requests.
 *
 * Mirrors the real backend's response shape and status-code semantics
 * exactly, as documented in orderStatusContract.md, so replacing this
 * mock with a real HTTP call later requires no changes to
 * responseHandler.js.
 *
 * DO NOT treat this as real data — it only knows about the 3 fake
 * order IDs listed below. NS1042's deliveryDate matches the real
 * backend's seeded sample data.
 */

const fakeOrders = {
  NS1042: { status: "shipped", deliveryDate: "2026-08-20" },
  NS2001: { status: "processing", deliveryDate: "2026-08-25" },
  NS3050: { status: "delivered", deliveryDate: "2026-08-10" },
};

/**
 * Mimics what the real GET /orders/:id endpoint returns, including
 * an HTTP-style status code, so the caller can branch on it the same
 * way it eventually will for the real HTTP response.
 *
 * @param {string} orderId
 * @returns {{ statusCode: number, body: Object }}
 */
function getOrderStatus(orderId) {
  const order = fakeOrders[orderId];

  if (!order) {
    return {
      statusCode: 404,
      body: { error: "Order not found" },
    };
  }

  return {
    statusCode: 200,
    body: {
      orderId,
      status: order.status,
      deliveryDate: order.deliveryDate,
    },
  };
}

module.exports = { getOrderStatus };