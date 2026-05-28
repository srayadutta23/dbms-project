# 🔍 Crime Pattern Analysis System

A full-stack web application for tracking, visualizing, and analyzing crime data. Built with HTML/CSS/JS on the frontend and Node.js + Express + MySQL on the backend.

---

## 📁 Project Structure

```
dbms-project/
├── server.js                 # Express backend server
├── crime_dashboard.html      # Frontend (single page app)
├── package.json              # Node dependencies
├── .env                      # Local DB credentials (NOT on git)
├── .gitignore                # Ignores node_modules + .env
└── node_modules/             # Installed packages (NOT on git)
```

---

## ⚙️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | HTML, CSS, JavaScript   |
| Charts    | Chart.js                |
| Backend   | Node.js + Express       |
| Database  | MySQL                   |
| Hosting   | Render (cloud)          |

---

## 🚀 Getting Started (Local Setup)

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org) (v16 or higher)
- [MySQL](https://www.mysql.com) or XAMPP

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/dbms-project.git
cd dbms-project
```

---

### Step 2 — Install Dependencies

```bash
npm install
```

---

### Step 3 — Create the Database

Open MySQL and run:

```sql
CREATE DATABASE IF NOT EXISTS crimes_db;
```

The `crimes` table will be created automatically when the server starts.

---

### Step 4 — Set Up Environment Variables

Create a `.env` file in the root folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=crimes_db
DB_PORT=3306
```

> ⚠️ Never commit this file to GitHub. It is already listed in `.gitignore`.

---

### Step 5 — Start the Server

```bash
node server.js
```

You should see:
```
Connected to MySQL
Server running on http://localhost:5000
```

---

### Step 6 — Open the App

Open your browser and go to:
```
http://localhost:5000
```

---

## 📡 API Endpoints

| Method | Endpoint         | Description          |
|--------|-----------------|----------------------|
| GET    | `/crimes`        | Fetch all crimes     |
| POST   | `/addcrime`      | Add a new crime      |
| PUT    | `/crimes/:id`    | Update a crime       |
| DELETE | `/crimes/:id`    | Delete a crime       |

### POST `/addcrime` — Request Body

```json
{
  "crime_type": "Theft",
  "location": "Downtown",
  "date": "2024-05-01",
  "time": "14:30",
  "severity": "Medium",
  "status": "Open",
  "description": "Shoplifting at convenience store"
}
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE crimes (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  crime_type  VARCHAR(50) NOT NULL,
  location    VARCHAR(100) NOT NULL,
  date        DATE NOT NULL,
  time        TIME,
  severity    ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
  status      ENUM('Open', 'Under Investigation', 'Resolved') DEFAULT 'Open',
  description TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🌐 Deploying to Render

### 1. Set Up a MySQL Database
- Go to [render.com](https://render.com) → New → MySQL
- Copy the connection credentials provided

### 2. Deploy the Web Service
- New → Web Service → Connect your GitHub repo
- Set the following:

| Setting         | Value            |
|----------------|------------------|
| Build Command  | `npm install`    |
| Start Command  | `node server.js` |

### 3. Add Environment Variables on Render
Go to your service → **Environment** tab and add:

```
DB_HOST      → (from Render MySQL)
DB_USER      → (from Render MySQL)
DB_PASSWORD  → (from Render MySQL)
DB_NAME      → (from Render MySQL)
DB_PORT      → 3306
```

Render auto-deploys on every `git push`.

---

## ✨ Features

- 📊 **Dashboard** — live metrics, trend charts, hotspot rankings
- 📋 **Crime Records** — filterable, searchable table with edit/delete
- ➕ **Add Crime** — form that saves directly to MySQL
- 🔍 **Pattern Analysis** — hourly, daily, and location correlation charts
- 🌡️ **Heatmap** — activity heatmap by day × hour
- 📄 **Reports** — executive summary, hotspot, trend, and SQL query reports

---

## 🔄 Git Workflow

After making changes:

```bash
git add .
git commit -m "describe your changes"
git push
```

---

## 👤 Sraya

Built as a DBMS project.
