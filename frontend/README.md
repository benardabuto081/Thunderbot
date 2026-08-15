# Frontend — owned by Koketso Matobako: Frontend/UX Engineer

## What's here

The customer-facing chat interface for Thunderbot. Plain HTML, CSS, and vanilla JavaScript — no framework, per the MVP simplicity rule.

- `index.html` — page structure
- `style.css` — styling (glass-effect chat UI with an animated accent orb)
- `script.js` — chat behavior: sending messages, displaying replies, order ID recognition, loading state, error handling with retry

## How to run it

No build step, no install needed. Just open `frontend/index.html` in any browser.

## Current status

- ✅ Chat UI, message bubbles, empty state, loading indicator — done
- ✅ Order ID recognition (e.g. "NS1042") — done, tested
- ✅ Error handling + retry — done (tested with a simulated failure)
- ✅ Responsive layout — tested down to mobile width
- ✅ Keyboard navigation and Enter-to-submit — verified working
- ⚠️ Bot replies are currently mocked, not real (see below)

## Known limitations

1. **Bot replies are not yet real.** The frontend uses keyword-matching
   and pattern recognition (e.g. detecting order ID formats like
   "NS1042") rather than a live backend response. This is intentional
   and clearly labeled in code via the `USE_REAL_API` flag in
   `script.js`. To test the error state manually, type `test error` as
   a message.

2. **Backend integration status as of submission:**
   - Per the system architecture (Customer → Chat Interface → Chatbot →
     Backend APIs → Database), the frontend integrates with the
     **chatbot layer** (`POST /chat`), not the backend directly.
   - The AI/Chatbot Engineer has intent detection logic committed
     (ORDER_STATUS, RETURN_REQUEST, REFUND_STATUS), but the `/chat`
     endpoint itself is not yet live.
   - The Backend Engineer separately has a working Express + PostgreSQL
     server (`GET /orders/:id`) — this is consumed by the chatbot layer
     internally, per `orderStatusContract.md`, and is intentionally not
     called directly by the frontend.
   - `callRealApi()` in `script.js` is pre-wired to call `POST /chat`
     and expects a `{ reply: "..." }` response shape (a reasonable
     placeholder assumption, not yet confirmed against Faith's actual
     contract). It can be activated via the `USE_REAL_API` toggle once
     `/chat` is live.

3. **No conversation memory.** The frontend does not track prior
   messages in a conversation; each message is evaluated independently.

4. **No persistent chat history.** Refreshing the page clears the
   conversation. There is no login or storage layer in this MVP.

5. **Error handling is tested against a simulated failure only**
   (triggered by typing "test error"), not yet against a real failed
   request to a live backend.

6. **Benign browser console message on load** — "Unsafe attempt to load
   URL... file: URLs are treated as unique security origins" — appears
   when opening `index.html` directly via `file://`. This is a browser
   security quirk related to local file access, not an application
   error.

## What's genuinely solid
- No unexpected console errors under normal or error-path use
- Tested with multiple messages sent in sequence, no display/layout bugs
- Tested on mobile-width viewport (375px), fully usable
- Empty message submission handled (no blank bubbles, no crash)
- Keyboard navigation and Enter-to-submit verified working