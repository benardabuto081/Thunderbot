const { detectIntent } = require("./intentDetector");

/**
 * Generates the chatbot's reply to a customer message.
 *
 * IMPORTANT: this function only decides WHAT KIND of reply to give
 * (based on intent). It does NOT invent order/refund facts — actual
 * order/return/refund data must come from the backend/database once
 * those integrations are connected. For now, this returns placeholder
 * next-step prompts for each recognized intent.
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

module.exports = { generateResponse };