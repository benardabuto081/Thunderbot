const { generateOrderStatusReply } = require("./responseHandler");

/**
 * Tests the full order-status lookup flow, using the mock backend.
 * Covers: a valid order, a different valid order, and an invalid order ID.
 */
const testCases = ["NS1042", "NS3050", "NS9999"];

console.log("Testing order status flow:\n");

testCases.forEach((orderId) => {
  const result = generateOrderStatusReply(orderId);
  console.log(`Order ID: ${orderId} -> "${result.reply}"`);
});