# Thunderbot

Northstar Support Deflection MVP — PLP Group 90

## Current Status

This project has a working backend and frontend, with chatbot integration partially complete. See docs/INTEGRATION_STATUS.md for a full, honest breakdown of what is live versus simulated.

Quick summary:
- Backend + database: live
- Order status lookup: live
- Chatbot replies: currently simulated, clearly disclosed in-app
- Returns/refunds: data layer and logic exist, not yet exposed via API

## Project Structure

    backend/
      src/
        server.js          - Express server, order status endpoint
        services/
          returnService.js - return eligibility logic (not yet wired to a route)
          refundService.js - refund eligibility logic (not yet wired to a route)
      src/init-db.sql       - database schema setup
    frontend/
      script.js             - chat UI, order ID extraction, mock/real API toggle
    docs/
      ARCHITECTURE.md        - system architecture and data flow
      INTEGRATION_STATUS.md  - known limitations and honest integration status
      schema.md               - full database schema and setup instructions

## Setup

Full database setup, environment configuration, and run instructions are documented in docs/schema.md. In short:

1. Install PostgreSQL, create the thunderbot database
2. Run backend/src/init-db.sql to create tables and seed sample data
3. Copy backend/.env.example to backend/.env and set your local DB password
4. cd backend, then npm install
5. node src/server.js
6. Verify with GET http://localhost:3000/health

See docs/schema.md for full detail, including sample data and endpoint verification steps.

## Team

- Backend: Josephleme
- AI/Chatbot: Msfay254 (Faith)
- Frontend: tweety-KM
- Integration/QA: benardabuto081

## Known Limitations

See docs/INTEGRATION_STATUS.md for full detail on what is live, what is simulated, and why.
