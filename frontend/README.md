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
- ✅ Order ID recognition (e.g. "NS1042") — done, tested
- ✅ Error handling + retry — done (tested with a simulated failure)
- ✅ Responsive layout — tested down to mobile width
- ✅ Keyboard navigation and Enter-to-submit — verified working
- ⚠️ **Bot replies are currently mocked**, not real. See `USE_REAL_API` flag in `script.js`.
- ⚠️ To test the error state manually, type `test error` as a message.

## Backend integration status (as of submission)

- AI/Chatbot Engineer has intent detection logic committed (ORDER_STATUS,
  RETURN_REQUEST, REFUND_STATUS), but no live server exposing it via HTTP.
- Backend Engineer has a working Express + PostgreSQL server
  (`GET /orders/:id`) with real routing and query logic, but it requires
  database credentials not available to the frontend as of submission.
- Frontend is fully pre-wired for both scenarios — see `USE_REAL_API`
  and `callRealApi()` in `script.js` — and can connect within minutes
  once a live, reachable, credentialed endpoint exists.

## Known limitations

1. **Bot replies are not yet real.** The frontend currently uses
   keyword-matching and pattern recognition (e.g. detecting order ID
   formats like "NS1042") rather than a live backend response. This is
   intentional and clearly labeled in code (`USE_REAL_API` flag,
   `script.js`).

2. **Real backend integration status as of submission:**
   - The AI/Chatbot Engineer has intent detection logic committed
     (ORDER_STATUS, RETURN_REQUEST, REFUND_STATUS), but no live server
     exposing it over HTTP yet.
   - The Backend Engineer has a working Express + PostgreSQL server
     (`GET /orders/:id`) with real routing and query logic, but it
     requires database credentials not available to the frontend as of
     submission time.
   - The frontend is fully pre-wired for both scenarios — see the
     `USE_REAL_API` toggle and `callRealApi()` function in `script.js` —
     and can be connected within minutes once a live, reachable endpoint
     with credentials exists.

3. **No conversation memory.** The frontend does not track prior messages
   in a conversation; each message is evaluated independently.

4. **No persistent chat history.** Refreshing the page clears the
   conversation. There is no login or storage layer in this MVP.

5. **Error handling is tested against a simulated failure only**
   (triggered by typing "test error"), not yet against a real failed
   request to a live backend.

## What's genuinely solid
- No console errors under normal or error-path use
- Tested with multiple messages sent in sequence, no display/layout bugs
- Tested on mobile-width viewport (375px), fully usable
- Empty message submission handled (no blank bubbles, no crash)
- Keyboard navigation and Enter-to-submit verified working

## Known browser note

A benign console message ("Unsafe attempt to load URL... file: URLs are
treated as unique security origins") appears when opening index.html
directly via file://. This is a browser security quirk related to local
file access, not an application error.