const { detectIntent } = require("./intentDetector");
const { getOrderStatus } = require("./orderService");

/**
 * Generates the chatbot's reply to a customer message.
 *
 * IMPORTANT: this function only decides WHAT KIND of reply to give
 * (based on intent). It does NOT invent order/refund facts — actual
 * order/return/refund data must come from the backend/database.
 *
 * @param {string} message - The raw customer message.
 * @returns {{ intent: string, reply: string }} The detected intent and
 *   the chatbot's response text.
 */
function generateResponse(message) {
  const intent = detectIntent(message);

  switch (intent) {
    case "ORDER_STATUS":
      return {
        intent,
        reply: "Sure — I can help with that. What's your order number?",
      };

    case "RETURN_REQUEST":
      return {
        intent,
        reply:
          "I can help you start a return. Could you tell me your order number and which item you'd like to return?",
      };

    case "REFUND_STATUS":
      return {
        intent,
        reply:
          "Let me check on that for you. What's the order number for the refund you're asking about?",
      };

    case "UNKNOWN":
    default:
      return {
        intent: "UNKNOWN",
        reply:
          "Sorry, I didn't quite understand that. I can help with order status, returns, or refunds — could you tell me a bit more about what you need?",
      };
  }
}

/**
 * Once the customer has provided an order ID (as a follow-up to
 * ORDER_STATUS intent), this looks it up and generates the real reply.
 *
 * Uses getOrderStatus from orderService.js, which makes a real HTTP
 * request to the backend and therefore returns a Promise — this
 * function must be async and await it.
 *
 * @param {string} orderId
 * @returns {Promise<{ reply: string }>}
 */
async function generateOrderStatusReply(orderId) {
  const result = await getOrderStatus(orderId);

  if (result.statusCode === 404) {
    return {
      reply: `I couldn't find an order with the ID "${orderId}". Could you double-check the order number?`,
    };
  }

  if (result.statusCode !== 200) {
    return {
      reply: "Something went wrong while looking up your order. Please try again in a moment.",
    };
  }

  const { status, deliveryDate } = result.body;

  return {
    reply: `Your order is currently "${status}" and expected to arrive by ${deliveryDate}.`,
  };
}

module.exports = { generateResponse, generateOrderStatusReply };