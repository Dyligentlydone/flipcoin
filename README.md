# FlipCoin

FlipCoin is a simple web app that lets you flip a virtual coin and see the result instantly. Built with React (Vite + TypeScript) on the frontend and FastAPI (Python) on the backend. Ready for deployment on Railway.

## Project Structure

- `frontend/` — React + Vite + TypeScript + TailwindCSS
- `backend/` — FastAPI + Uvicorn + SQLite

## Local Development

1. Install dependencies for both frontend and backend.
2. Run backend: `uvicorn main:app --reload` from the backend directory.
3. Run frontend: `npm run dev` from the frontend directory.

## Deployment

- Deploy the monorepo to Railway. Each service (frontend/backend) can be set up as a Railway service.

## Environment Variables

- Store all secrets (API keys, DB URLs) in Railway environment variables.

---

Created: May 2025
