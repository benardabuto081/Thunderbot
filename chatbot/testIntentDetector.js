const { detectIntent } = require("./intentDetector");
const intentsData = require("./intents.json");

// Grab the ORDER_STATUS examples we defined in Task 1
const orderStatusIntent = intentsData.intents.find(
  (intent) => intent.name === "ORDER_STATUS"
);

console.log("Testing ORDER_STATUS detection:\n");

let passCount = 0;

orderStatusIntent.examples.forEach((message) => {
  const result = detectIntent(message);
  const passed = result === "ORDER_STATUS";

  if (passed) passCount++;

  console.log(
    `${passed ? "PASS" : "FAIL"} | "${message}" -> detected: ${result}`
  );
});

console.log(`\n${passCount}/${orderStatusIntent.examples.length} passed.`);