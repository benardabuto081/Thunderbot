const intentsData = require("./intents.json");

/**
 * Detects the customer's intent from their raw message.
 * Uses simple keyword matching — no AI/LLM involved yet.
 * This keeps the MVP predictable and testable.
 *
 * @param {string} message - The raw customer message.
 * @returns {string} The detected intent name, or "UNKNOWN" if no match.
 */
function detectIntent(message) {
  const normalizedMessage = message.toLowerCase();

  const orderStatusKeywords = [
    "order",
    "shipped",
    "shipping",
    "track",
    "tracking",
    "arrive",
    "delivery",
    "package",
  ];

  const matchesOrderStatus = orderStatusKeywords.some((keyword) =>
    normalizedMessage.includes(keyword)
  );

  if (matchesOrderStatus) {
    return "ORDER_STATUS";
  }

  return "UNKNOWN";
}

module.exports = { detectIntent };