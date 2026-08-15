/**
 * TEMPORARY MOCK — stands in for the real backend Order Status API
 * (Issue #5, owned by the Backend Engineer) until it's built.
 *
 * Matches the shape defined in orderStatusContract.md exactly, so
 * swapping this out for the real API later should require no changes
 * to any code that calls getOrderStatus.
 *
 * DO NOT treat this as real data — it only knows about the 3 fake
 * order IDs listed below.
 */

const fakeOrders = {
  NS1042: { status: "shipped", expectedDelivery: "2026-08-16" },
  NS2001: { status: "processing", expectedDelivery: "2026-08-20" },
  NS3050: { status: "delivered", expectedDelivery: "2026-08-10" },
};

/**
 * @param {string} orderId
 * @returns {{ found: boolean, status?: string, expectedDelivery?: string, reason?: string }}
 */
function getOrderStatus(orderId) {
  const order = fakeOrders[orderId];

  if (!order) {
    return {
      found: false,
      reason: "No order found with that ID.",
    };
  }

  return {
    found: true,
    status: order.status,
    expectedDelivery: order.expectedDelivery,
  };
}

module.exports = { getOrderStatus };