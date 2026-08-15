const { generateOrderStatusReply } = require("./responseHandler");

/**
 * Tests the full order-status lookup flow, using the REAL backend
 * (orderService.js -> GET /orders/:id), not the mock.
 *
 * Requires the backend server to be running locally with a seeded
 * database. Run `node backend/src/server.js` in a separate terminal
 * before running this test.
 *
 * NS1042 is expected to exist in the seeded database (per
 * backend/src/init-db.sql). NS9999 is expected NOT to exist.
 */
const testCases = [
  {
    orderId: "NS1042",
    mustInclude: ["shipped"], // adjust if seed data differs
  },
  {
    orderId: "NS9999",
    mustInclude: ["couldn't find"],
  },
];

async function runTests() {
  console.log("Testing order status flow against REAL backend:\n");

  let allPassed = true;

  for (const { orderId, mustInclude } of testCases) {
    const result = await generateOrderStatusReply(orderId);

    const passed = mustInclude.every((expected) =>
      result.reply.includes(expected)
    );

    if (!passed) allPassed = false;

    console.log(
      `${passed ? "PASS" : "FAIL"} | Order ID: ${orderId} -> "${result.reply}"`
    );
  }

  if (!allPassed) {
    console.log("\nSome order status tests FAILED.");
    process.exit(1);
  }

  console.log("\nAll order status tests passed.");
}

runTests();