const { generateResponse } = require("./responseHandler");

/**
 * Deliberately tricky/unexpected inputs, to prove the chatbot
 * never crashes no matter what a customer (or a bug) throws at it.
 */
const trickyInputs = [
  "What's the weather today?", // genuinely unrelated message
  "",                          // empty string
  "   ",                       // whitespace only
  null,                        // no message at all
  undefined,                   // no message at all
  12345,                       // wrong type entirely
];

console.log("Testing fallback handling with tricky inputs:\n");

let crashed = false;

trickyInputs.forEach((input) => {
  try {
    const result = generateResponse(input);
    console.log(
      `OK    | input: ${JSON.stringify(input)} -> intent: ${result.intent}, reply: "${result.reply}"`
    );
  } catch (error) {
    crashed = true;
    console.log(`CRASH | input: ${JSON.stringify(input)} -> ${error.message}`);
  }
});

console.log(
  crashed
    ? "\nSome inputs crashed the chatbot — this must be fixed before shipping."
    : "\nNo crashes. The chatbot handled all tricky inputs safely."
);