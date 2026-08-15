const intentsData = require("./intents.json");

/**
 * Detects the customer's intent from their raw message.
 * Uses simple keyword matching — no AI/LLM involved yet.
 *
 * Checks are ordered: REFUND_STATUS -> RETURN_REQUEST -> ORDER_STATUS.
 * REFUND_STATUS and RETURN_REQUEST are checked first because the word
 * "order" commonly appears inside return/refund messages too (e.g.
 * "refund for my order"), and would otherwise be wrongly caught by the
 * more generic ORDER_STATUS check.
 *
 * @param {string} message - The raw customer message.
 * @returns {string} The detected intent name, or "UNKNOWN" if no match.
 */
function detectIntent(message) {
  const normalizedMessage = message.toLowerCase();

  const refundStatusKeywords = [
    "refund",
    "money back",
    "reimburse",
    "money",
  ];

  const returnRequestKeywords = [
    "return",
    "back",
    "exchange",
    "doesn't fit",
    "wrong size",
  ];

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

  const matchesRefundStatus = refundStatusKeywords.some((keyword) =>
    normalizedMessage.includes(keyword)
  );
  if (matchesRefundStatus) {
    return "REFUND_STATUS";
  }

  const matchesReturnRequest = returnRequestKeywords.some((keyword) =>
    normalizedMessage.includes(keyword)
  );
  if (matchesReturnRequest) {
    return "RETURN_REQUEST";
  }

  const matchesOrderStatus = orderStatusKeywords.some((keyword) =>
    normalizedMessage.includes(keyword)
  );
  if (matchesOrderStatus) {
    return "ORDER_STATUS";
  }

  return "UNKNOWN";
}

module.exports = { detectIntent };