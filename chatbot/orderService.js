/**
 * Real Order Status service — calls the actual backend endpoint
 * (GET /orders/:id, from backend/src/server.js) over HTTP.
 *
 * This is the real counterpart to mockOrderService.js. Both return the
 * exact same shape ({ statusCode, body }), so responseHandler.js works
 * identically regardless of which one is imported — swapping between
 * them is just changing one require() line.
 *
 * BACKEND_BASE_URL defaults to localhost:3000, matching the PORT
 * hardcoded in backend/src/server.js. Override with the
 * ORDER_SERVICE_BASE_URL environment variable if the backend runs
 * somewhere else (e.g. a deployed URL).
 */

const BACKEND_BASE_URL =
  process.env.ORDER_SERVICE_BASE_URL || "http://localhost:3000";

/**
 * @param {string} orderId
 * @returns {Promise<{ statusCode: number, body: Object }>}
 */
async function getOrderStatus(orderId) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/orders/${orderId}`);
    const body = await response.json();

    return {
      statusCode: response.status,
      body,
    };
  } catch (error) {
    // Network-level failure — backend unreachable, not a normal 404/500
    // from the backend itself. The chatbot should still respond
    // gracefully rather than crash.
    return {
      statusCode: 503,
      body: { error: "Could not reach the order service. Please try again shortly." },
    };
  }
}

module.exports = { getOrderStatus };