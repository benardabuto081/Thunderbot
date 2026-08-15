const express = require("express");
const router = express.Router();

const { generateResponse, generateOrderStatusReply } = require("../../../chatbot/responseHandler");

/**
 * POST /chat
 *
 * Accepts a customer message, runs it through intent detection, and
 * returns a chatbot reply.
 *
 * Request body:
 *   { "message": "where is my order?", "orderId": "NS1042" }
 *   - "message" is required.
 *   - "orderId" is optional. If the detected intent is ORDER_STATUS
 *     and an orderId is provided, the real order status is looked up
 *     immediately. If ORDER_STATUS is detected but no orderId is
 *     given, the chatbot asks for one (no lookup happens yet) - this
 *     is a simplification for a single-request endpoint; real
 *     multi-turn conversation state is a future improvement.
 *
 * Response body (200):
 *   { "intent": "ORDER_STATUS", "reply": "Your order is currently..." }
 *
 * Response body (400):
 *   { "error": "message is required" }
 */
router.post("/chat", async (req, res) => {
  const { message, orderId } = req.body;

  if (typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "message is required" });
  }

  const initialResponse = generateResponse(message);

  if (initialResponse.intent === "ORDER_STATUS" && orderId) {
    const orderStatusResponse = await generateOrderStatusReply(orderId);
    return res.status(200).json({
      intent: "ORDER_STATUS",
      reply: orderStatusResponse.reply,
    });
  }

  return res.status(200).json(initialResponse);
});

module.exports = router;