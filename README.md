# 🚍 Urban Intelligence Platform (SIH 2026) - AI Bus Camera

An AI-driven municipal transit and road condition monitoring system. Detects and tracks road potholes, waterlogging, traffic bottlenecks, and bus fleets in real time.

---

## 🏗️ Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Leaflet, Recharts
- **Backend**: Python 3.12, FastAPI, Uvicorn, Pydantic

---

## 🚀 Quick Deployment Guide

### Step 1: Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `ai-bus-camera`).
2. Run in terminal:
   ```bash
   git remote add origin https://github.com/<your-username>/ai-bus-camera.git
   git push -u origin main
   ```

---

### Step 2: Deploy Backend to Render (Free)

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New + > Web Service**.
2. Connect your GitHub repository `ai-bus-camera`.
3. Configure the settings:
   - **Name**: `ai-bus-camera-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Click **Create Web Service**.
5. Once deployed, copy your backend URL (e.g., `https://ai-bus-camera-backend.onrender.com`).

---

### Step 3: Deploy Frontend to Vercel (Free)

1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import the `ai-bus-camera` repository from GitHub.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click edit and select `frontend`
   - **Environment Variables**:
     - Key: `VITE_API_BASE_URL`
     - Value: `https://<your-backend-name>.onrender.com/api`
4. Click **Deploy**.
5. Your public website link is now live! Anyone worldwide can open it.

---

## 💻 Local Development

- Run both frontend and backend locally with:
  ```bash
  .\run.ps1
  ```
- Or run separately:
  - Backend: `cd backend && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload`
  - Frontend: `cd frontend && npm run dev`
