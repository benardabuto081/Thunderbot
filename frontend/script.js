// TEMPORARY: This uses a fake/mock bot reply.
// It will be replaced once the real chatbot/backend API is ready.
//
// KNOWN LIMITATION (temporary): this mock does not remember conversation
// context (e.g. it won't recall that you already said "refund" on your next
// message). Real context/intent handling is owned by the AI/Chatbot teammate
// and will replace this function entirely once their API is connected.

const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const typingIndicator = document.getElementById("typing-indicator");

function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.classList.add("message", `${sender}-message`);
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addErrorMessage(retryText) {
  const bubble = document.createElement("div");
  bubble.classList.add("message", "error-message");

  const icon = document.createElement("span");
  icon.classList.add("error-icon");
  icon.textContent = "⚠️";

  const content = document.createElement("div");
  content.classList.add("error-content");

  const text = document.createElement("span");
  text.textContent = "Thunderbot couldn't respond. Please check your connection and try again.";

  const retryButton = document.createElement("button");
  retryButton.classList.add("retry-link");
  retryButton.type = "button";
  retryButton.textContent = "Try again";
  retryButton.addEventListener("click", function () {
    bubble.remove();
    sendMessage(retryText);
  });

  content.appendChild(text);
  content.appendChild(retryButton);
  bubble.appendChild(icon);
  bubble.appendChild(content);
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getMockBotReply(userText) {
  const lower = userText.toLowerCase();
  if (lower.includes("order")) {
    return "Sure — what is your order number?";
  }
  if (lower.includes("return") || lower.includes("refund")) {
    return "I can help with that. What is your order number for the return?";
  }
  return "I can help with order status or returns/refunds. Could you tell me which one you need?";
}

// TEMPORARY TEST HOOK: typing "test error" simulates a failed request,
// so we can build/verify the error UI before the real API exists.
// Remove this check once real API error handling is in place.
function simulateApiCall(userText) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (userText.toLowerCase() === "test error") {
        reject(new Error("Simulated network failure"));
      } else {
        resolve(getMockBotReply(userText));
      }
    }, 700);
  });
}

function sendMessage(userText) {
  addMessage(userText, "user");

  sendButton.disabled = true;
  chatInput.disabled = true;
  typingIndicator.classList.remove("hidden");

  simulateApiCall(userText)
    .then(function (reply) {
      addMessage(reply, "bot");
    })
    .catch(function () {
      addErrorMessage(userText);
    })
    .finally(function () {
      typingIndicator.classList.add("hidden");
      sendButton.disabled = false;
      chatInput.disabled = false;
      chatInput.focus();
    });
}

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const userText = chatInput.value.trim();
  if (userText === "") {
    return;
  }

  chatInput.value = "";
  sendMessage(userText);
});