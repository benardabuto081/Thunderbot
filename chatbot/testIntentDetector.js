const { detectIntent } = require("./intentDetector");
const intentsData = require("./intents.json");

/**
 * Runs every example message for a given intent through detectIntent
 * and reports how many passed.
 */
function testIntent(intentName) {
  const intent = intentsData.intents.find((i) => i.name === intentName);

  console.log(`\nTesting ${intentName} detection:`);

  let passCount = 0;

  intent.examples.forEach((message) => {
    const result = detectIntent(message);
    const passed = result === intentName;

    if (passed) passCount++;

    console.log(
      `${passed ? "PASS" : "FAIL"} | "${message}" -> detected: ${result}`
    );
  });

  console.log(`${passCount}/${intent.examples.length} passed.`);

  return passCount === intent.examples.length;
}

const orderStatusOk = testIntent("ORDER_STATUS");
const returnRequestOk = testIntent("RETURN_REQUEST");
const refundStatusOk = testIntent("REFUND_STATUS");

console.log("\n--- Summary ---");
console.log(`ORDER_STATUS:   ${orderStatusOk ? "ALL PASSED" : "SOME FAILED"}`);
console.log(`RETURN_REQUEST: ${returnRequestOk ? "ALL PASSED" : "SOME FAILED"}`);
console.log(`REFUND_STATUS:  ${refundStatusOk ? "ALL PASSED" : "SOME FAILED"}`);