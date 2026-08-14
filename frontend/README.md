# Frontend — owned by Frontend/UX Engineer

## What's here

The customer-facing chat interface for Thunderbot. Plain HTML, CSS, and vanilla JavaScript — no framework, per the MVP simplicity rule.

- `index.html` — page structure
- `style.css` — styling (glass-effect chat UI with an animated accent orb)
- `script.js` — chat behavior: sending messages, displaying replies, loading state, error handling with retry

## How to run it

No build step, no install needed. Just open `frontend/index.html` in any browser.

## Current status

- ✅ Chat UI, message bubbles, empty state, loading indicator — done
- ✅ Error handling + retry — done (tested with a simulated failure)
- ✅ Responsive layout — tested down to mobile width
- ⚠️ **Bot replies are currently mocked**, not real. See the comments at the top of `script.js`.
- ⚠️ To test the error state manually, type `test error` as a message — this is a temporary test hook, also commented in the code.

## Depends on

Real chatbot responses require an API contract (URL, request format, response format) from the AI/Chatbot Engineer. Until that's connected, `script.js` uses placeholder logic clearly marked as temporary.