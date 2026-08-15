const { generateOrderStatusReply } = require("./responseHandler");

/**
 * Tests the full order-status lookup flow, using the mock backend.
 * Covers: a valid order, a different valid order, and an invalid order ID.
 * Each case asserts the reply actually contains the expected content,
 * rather than just printing output for a human to eyeball.
 */
const testCases = [
  {
    orderId: "NS1042",
    mustInclude: ["shipped", "2026-08-20"],
  },
  {
    orderId: "NS3050",
    mustInclude: ["delivered", "2026-08-10"],
  },
  {
    orderId: "NS9999",
    mustInclude: ["couldn't find"],
  },
];

console.log("Testing order status flow:\n");

let allPassed = true;

testCases.forEach(({ orderId, mustInclude }) => {
  const result = generateOrderStatusReply(orderId);

  const passed = mustInclude.every((expected) =>
    result.reply.includes(expected)
  );

  if (!passed) allPassed = false;

  console.log(
    `${passed ? "PASS" : "FAIL"} | Order ID: ${orderId} -> "${result.reply}"`
  );
});

if (!allPassed) {
  console.log("\nSome order status tests FAILED.");
  process.exit(1);
}

console.log("\nAll order status tests passed.");