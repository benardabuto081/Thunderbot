// TEMPORARY: Mock bot replies are used until the real chatbot API is ready.
// Once Faith (AI/Chatbot Engineer) provides the real endpoint:
//   1. Set USE_REAL_API to true
//   2. Set API_URL to the real endpoint
// Everything else should work unchanged.

const USE_REAL_API = false; // ← flip this to true once the real API is ready
const API_URL = "https://PLACEHOLDER-api-not-real-yet.example.com/chat"; // ← replace with Faith's real URL

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

// Recognizes Northstar order ID format: letters followed by digits, e.g. "NS1042".
// Looks for this pattern anywhere in the message, not just as the whole message,
// so "my order is NS1042" and "NS1042" alone both work.
function extractOrderId(text) {
  const match = text.match(/\b([A-Z]{2}\d{3,8})\b/i);
  return match ? match[1].toUpperCase() : null;
}

function getMockBotReply(userText) {
  const orderId = extractOrderId(userText);
  if (orderId) {
    // TEMPORARY: real order lookup comes from the backend once connected.
    return `Got it — looking up order ${orderId}. (This is placeholder data until connected to the real order lookup.)`;
  }

  const lower = userText.toLowerCase();
  if (lower.includes("order")) {
    return "Sure — what is your order number?";
  }
  if (lower.includes("return") || lower.includes("refund")) {
    return "I can help with that. What is your order number for the return?";
  }
  return "I can help with order status or returns/refunds. Could you tell me which one you need?";
}

// TEMPORARY TEST HOOK: typing "test error" simulates a failed request.
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

// REAL API call — this is what actually talks to Faith's chatbot backend.
// Expects: POST request, JSON body { message: "..." }
// Expects response: JSON body { reply: "..." }
// Adjust field names here ONLY if Faith's contract uses different keys.
function callRealApi(userText) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userText })
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Server responded with an error: " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      if (data.error) {
        throw new Error(data.error);
      }
      return data.reply;
    });
}
function sendMessage(userText) {
  addMessage(userText, "user");

  sendButton.disabled = true;
  chatInput.disabled = true;
  typingIndicator.classList.remove("hidden");

  const apiCall = USE_REAL_API ? callRealApi(userText) : simulateApiCall(userText);

  apiCall
    .then(function (reply) {
      addMessage(reply, "bot");
    })
    .catch(function (err) {
      console.error("Chat request failed:", err);
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