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

/**
 * Regression tests: messages that contain words which used to be
 * treated as standalone keywords ("back", "money") but should NOT
 * match their old intent, because those words are too generic on
 * their own. These guard against the false-positive bug QA flagged.
 */
function testRegressionCases() {
  console.log("\nTesting regression cases (should NOT match):");

  const regressionCases = [
    {
      message: "How much money does shipping cost?",
      shouldNotBe: "REFUND_STATUS",
    },
    {
      message: "I want to get back to my account settings.",
      shouldNotBe: "RETURN_REQUEST",
    },
    {
      message: "Can you call me back later?",
      shouldNotBe: "RETURN_REQUEST",
    },
  ];

  let allPassed = true;

  regressionCases.forEach(({ message, shouldNotBe }) => {
    const result = detectIntent(message);
    const passed = result !== shouldNotBe;

    if (!passed) allPassed = false;

    console.log(
      `${passed ? "PASS" : "FAIL"} | "${message}" -> detected: ${result} (must NOT be ${shouldNotBe})`
    );
  });

  return allPassed;
}

const orderStatusOk = testIntent("ORDER_STATUS");
const returnRequestOk = testIntent("RETURN_REQUEST");
const refundStatusOk = testIntent("REFUND_STATUS");
const regressionOk = testRegressionCases();

console.log("\n--- Summary ---");
console.log(`ORDER_STATUS:      ${orderStatusOk ? "ALL PASSED" : "SOME FAILED"}`);
console.log(`RETURN_REQUEST:    ${returnRequestOk ? "ALL PASSED" : "SOME FAILED"}`);
console.log(`REFUND_STATUS:     ${refundStatusOk ? "ALL PASSED" : "SOME FAILED"}`);
console.log(`Regression tests:  ${regressionOk ? "ALL PASSED" : "SOME FAILED"}`);

const allTestsPassed =
  orderStatusOk && returnRequestOk && refundStatusOk && regressionOk;

if (!allTestsPassed) {
  console.log("\nSome tests FAILED.");
  process.exit(1);
}

console.log("\nAll tests passed.");