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
 * Keywords are deliberately specific phrases rather than single generic
 * words like "back" or "money" — those caused false positives (e.g.
 * "get back to my account", "how much money does shipping cost") when
 * matched with simple substring checks. The one exception is the
 * "send" + "back" pair below, which requires BOTH words to appear
 * together (not a single word) — specific enough to avoid false
 * positives, flexible enough to catch phrasing like "send this item
 * back" without needing an exact phrase match.
 *
 * Handles unexpected input safely: empty strings, null, undefined, or
 * non-string values all return "UNKNOWN" instead of crashing. A crashed
 * chatbot is worse than one that just says "I didn't understand that."
 *
 * @param {string} message - The raw customer message.
 * @returns {string} The detected intent name, or "UNKNOWN" if no match
 *   or if the input isn't usable text.
 */
function detectIntent(message) {
  if (typeof message !== "string" || message.trim().length === 0) {
    return "UNKNOWN";
  }

  const normalizedMessage = message.toLowerCase();

  const refundStatusKeywords = [
    "refund",
    "money back",
    "reimburse",
    "get my money",
    "where's my money",
    "wheres my money",
  ];

  const returnRequestKeywords = [
    "return",
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

  // "send" and "back" both appearing (in either order, anywhere in the
  // message) is a strong, specific signal for a return request, without
  // being as broad as matching "back" alone.
  const matchesSendBack =
    normalizedMessage.includes("send") && normalizedMessage.includes("back");

  const matchesReturnRequestKeyword = returnRequestKeywords.some((keyword) =>
    normalizedMessage.includes(keyword)
  );

  if (matchesReturnRequestKeyword || matchesSendBack) {
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