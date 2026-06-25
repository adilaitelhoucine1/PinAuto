# 📌 Pinterest Upload Manager

A full-stack web application for managing and scheduling image uploads to Pinterest. Built with React, Node.js/Express, and PostgreSQL — fully containerized with Docker for zero-config setup.

---

## 🛠 Tech Stack

| Layer        | Technology                     |
| ------------ | ------------------------------ |
| **Frontend** | React 18 + Vite                |
| **Backend**  | Node.js 20 + Express           |
| **Database** | PostgreSQL 16                  |
| **Runtime**  | Docker & Docker Compose        |
| **Dev DX**   | Nodemon (backend) + Vite HMR   |

---

## 📋 Prerequisites

You only need **two things** installed on your machine:

- [Docker](https://docs.docker.com/get-docker/) (v20+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+, included with Docker Desktop)

> **Note:** No local Node.js, npm, or PostgreSQL installation required — everything runs inside containers.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd pinterest-tool

# 2. Copy the environment file
cp .env.example .env

# 3. Start all services
docker compose up --build
```

Once the containers are running:

| Service      | URL                          |
| ------------ | ---------------------------- |
| **Frontend** | http://localhost:5173        |
| **Backend**  | http://localhost:3001        |
| **Database** | localhost:5432               |

---

## 🏗 Architecture Overview

The application runs as **3 Docker containers** orchestrated by Docker Compose:

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                       │
│                                                         │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────┐  │
│  │   Frontend   │──▶│   Backend    │──▶│  Database   │  │
│  │  React/Vite  │   │   Express    │   │ PostgreSQL  │  │
│  │  :5173       │   │  :3001       │   │  :5432      │  │
│  └──────────────┘   └──────────────┘   └────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- **Frontend** → React SPA that communicates with the backend API
- **Backend** → REST API handling image uploads, pin management, and scheduling
- **Database** → PostgreSQL for persistent storage of pins, boards, and schedules

---

## 📡 API Endpoints

| Method   | Endpoint               | Description                        |
| -------- | ---------------------- | ---------------------------------- |
| `GET`    | `/api/health`          | Health check                       |
| `GET`    | `/api/pins`            | List all pins                      |
| `POST`   | `/api/pins`            | Create a new pin (with image)      |
| `GET`    | `/api/pins/:id`        | Get a single pin by ID             |
| `PUT`    | `/api/pins/:id`        | Update a pin                       |
| `DELETE` | `/api/pins/:id`        | Delete a pin                       |
| `GET`    | `/api/boards`          | List all boards                    |
| `POST`   | `/api/boards`          | Create a new board                 |
| `POST`   | `/api/upload`          | Upload an image file               |
| `GET`    | `/api/schedule`        | List scheduled uploads             |
| `POST`   | `/api/schedule`        | Schedule a pin for upload           |

---

## 🔧 Development Setup

### Hot Reload

Both frontend and backend support **hot reloading** in development:

- **Frontend:** Vite HMR — edit files in `frontend/src/` and see changes instantly
- **Backend:** Nodemon — edit files in `backend/src/` and the server auto-restarts

Source directories are mounted as Docker volumes, so you edit files locally and changes are reflected in the containers immediately.

### Useful Commands

```bash
# Start all services (foreground with logs)
docker compose up --build

# Start in detached mode (background)
docker compose up --build -d

# View logs for a specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db

# Stop all services
docker compose down

# Stop and remove volumes (⚠ deletes database data)
docker compose down -v

# Rebuild a single service
docker compose build backend

# Open a shell inside a container
docker compose exec backend sh
docker compose exec db psql -U pinterest_user -d pinterest_manager
```

### Production Deployment

```bash
# Build and run with production configuration
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

In production mode:
- Frontend is built as static assets and served via **nginx** on port **80**
- Backend runs with `node` directly (no nodemon)
- Source volume mounts are removed
- PostgreSQL port is not exposed to the host

---

## 🌐 Environment Variables

| Variable            | Default              | Description                            |
| ------------------- | -------------------- | -------------------------------------- |
| `POSTGRES_USER`     | `pinterest_user`     | PostgreSQL username                    |
| `POSTGRES_PASSWORD` | `pinterest_pass`     | PostgreSQL password                    |
| `POSTGRES_DB`       | `pinterest_manager`  | PostgreSQL database name               |
| `POSTGRES_HOST`     | `db`                 | Database hostname (Docker service name)|
| `POSTGRES_PORT`     | `5432`               | PostgreSQL port                        |
| `BACKEND_PORT`      | `3001`               | Backend API server port                |
| `NODE_ENV`          | `development`        | Node environment                       |
| `VITE_API_URL`      | `http://localhost:3001` | Backend URL for frontend API calls  |
| `FRONTEND_PORT`     | `5173`               | Frontend dev server port               |

---

## 📁 Project Structure

```
pinterest-tool/
├── docker-compose.yml          # Development orchestration
├── docker-compose.prod.yml     # Production overrides
├── .env                        # Environment variables (git-ignored)
├── .env.example                # Environment template
├── .gitignore
├── README.md
│
├── backend/
│   ├── Dockerfile              # Development image
│   ├── Dockerfile.prod         # Production image
│   ├── package.json
│   └── src/
│       ├── server.js           # Express app entry point
│       ├── routes/             # API route handlers
│       ├── models/             # Database models
│       ├── middleware/         # Express middleware
│       └── config/             # Database & app configuration
│
└── frontend/
    ├── Dockerfile              # Development image
    ├── Dockerfile.prod         # Production image (multi-stage)
    ├── nginx.conf              # Nginx config for production SPA
    ├── package.json
    ├── index.html
    └── src/
        ├── App.jsx             # Root component
        ├── main.jsx            # Entry point
        ├── components/         # React components
        ├── pages/              # Page-level components
        └── services/           # API service layer
```

---

## 🗺 Future Roadmap

- [ ] **Pinterest OAuth Integration** — Connect to Pinterest API for direct publishing
- [ ] **Bulk Upload** — Upload and schedule multiple images at once
- [ ] **Board Management** — Create, edit, and organize Pinterest boards
- [ ] **Analytics Dashboard** — Track pin performance and engagement
- [ ] **Image Editor** — Crop, resize, and add text overlays before uploading
- [ ] **Scheduling Calendar** — Visual calendar view for scheduled pins
- [ ] **Multi-Account Support** — Manage multiple Pinterest accounts
- [ ] **AI Pin Descriptions** — Auto-generate SEO-friendly descriptions
- [ ] **Webhook Notifications** — Get notified when scheduled pins are published
- [ ] **Team Collaboration** — Invite team members with role-based permissions

---

## 📄 License

This project is licensed under the MIT License.
