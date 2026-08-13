// TEMPORARY: This uses a fake/mock bot reply.
// It will be replaced once the real chatbot/backend API is ready.
// Marked clearly so nobody mistakes this for the final integration.

const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");

function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.classList.add("message", `${sender}-message`);
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getMockBotReply(userText) {
  // TEMPORARY mock logic — real intent detection comes from the AI/Chatbot teammate.
  const lower = userText.toLowerCase();
  if (lower.includes("order")) {
    return "Sure — what is your order number?";
  }
  if (lower.includes("return") || lower.includes("refund")) {
    return "I can help with that. What is your order number for the return?";
  }
  return "I can help with order status or returns/refunds. Could you tell me which one you need?";
}

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const userText = chatInput.value.trim();
  if (userText === "") {
    return; // handles empty message submission
  }

  addMessage(userText, "user");
  chatInput.value = "";

  // Simulate a short delay + loading state before the bot "responds"
  sendButton.disabled = true;
  chatInput.disabled = true;

  setTimeout(function () {
    const reply = getMockBotReply(userText);
    addMessage(reply, "bot");
    sendButton.disabled = false;
    chatInput.disabled = false;
    chatInput.focus();
  }, 600);
});