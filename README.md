VITI - Voice-Enabled Task Tracker
======================================

A smart task management system with **voice input**, **AI parsing**, **kanban board**, **list view**, **drag-and-drop**, **filters**, & **MongoDB backend**.

* * * * *

Project Overview
-------------------

This project is a **Voice-Enabled Task Management System** that allows users to create and manage tasks using **voice commands** as well as a **manual form**.\
The system parses speech input using **AI (Groq) + fallback rule-based NLP**, extracts details like **title, priority, status, and due date**, and lets users **review/edit before saving**.

It offers both **Kanban Board View** and **List View**, along with **filters, search, editing, deletion, and drag-and-drop status updates**.\

* * * * *

Features
----------

### Core Functionality

-   Add tasks manually using form modal

-   Add tasks using **voice command → speech to text → AI parsed → task created**

-   Edit existing tasks (title, description, status, priority, due date)

-   Delete tasks with confirmation popup

-   **Kanban Board View**

    -   Columns: *Todo → In-Progress → Done*

    -   Drag-and-drop status update

-   **List View** alternative display

-   Search tasks by **title / description**

-   Filter by **status, priority, due date**

-   Responsive UI design

-   Persistent data using **MongoDB**

* * * * *

Voice Processing & AI Parsing
--------------------------------

-   Uses **Web Speech API** for speech-to-text

-   Backend parsing logic:

    -   **Primary:** Groq LLM *structured JSON extraction*

    -   **Fallback:** Rule-based NLP keyword detection

-   Supports **relative dates**:\
    `"Tomorrow"`, `"Next Monday"`, `"In 3 days"`, `"After a week"`

-   Supports **absolute dates**:\
    `"15 December"`, `"10/02/2025"`, `"25-11-24"`

-   Parsed data is editable before saving

* * * * *

Tech Stack
-------------

### Frontend

-   **React + Vite**

-   Context API (state handling)

-   Axios (API calls)

-   Components: *BoardView, ListView, VoiceModal, TaskModal, TaskCard, DeleteModal*

### Backend

-   **Node.js + Express**

-   RESTful APIs (CRUD)

-   **MongoDB + Mongoose**

-   AI parsing with **Groq**

-   NLP fallback using **chrono-node** + keyword mapping

-   Centralized error handling middleware

* * * * *

Project Structure
--------------------

`tasks_system/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/ (AI Parser + Fallback)
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/components/
    ├── src/context/
    ├── src/api/
    ├── src/App.jsx
    ├── index.css
    ├── vite.config.js
    └── package.json`

* * * * *

How to Run the Project
-------------------------

### 1️ Clone Repo

`git clone <repo-url>
cd tasks_system`

### 2️ Backend Setup

`cd backend
npm install`

Create `.env` file:

`MONGO_URI=your_mongo_connection_string
PORT=5000
NODE_ENV=development
GROQ_API_KEY=your_key_here    # AI Key`

Run server:

`npm start`

### 3️ Frontend Setup

`cd ../frontend
npm install
npm run dev`

* * * * *

### App Opens At

-    **Frontend:** <http://localhost:5173>

-    **Backend:** <http://localhost:5000>

* * * * *

API Endpoints
----------------

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | Get tasks (filters + search supported) |
| GET | `/api/tasks/:id` | Get single task |
| PUT | `/api/tasks/:id` | Edit task fully |
| PATCH | `/api/tasks/:id` | Update only status |
| DELETE | `/api/tasks/:id` | Delete task |
| POST | `/api/voice/parse` | Parse transcript → structured task JSON |

#### Example Voice Input

`{ "transcript": "Create task prepare resume high priority tomorrow" }`

#### Response

`{
  "title": "Prepare resume",
  "priority": "high",
  "status": "todo",
  "dueDate": "2024-12-05"
}`

* * * * *

Using Groq AI for Voice Parsing
---------------------------------

The project uses **Groq API** to convert voice-derived text into a structured task format (title, priority, status, due date).\
Groq provides fast LLM inference similar to OpenAI, and we use it for **natural language parsing** when users submit voice input.

#### Get Groq API Key

1.  Visit **<https://console.groq.com/>**

2.  Sign up / log in

3.  Go to **API Keys** section

4.  Create a new key

#### Add Key to Backend `.env`

`GROQ_API_KEY=your_groq_key_here`

* * * * *

Design Decisions & Assumptions
---------------------------------

-   Web Speech API used instead of paid STT provider (fast & offline support)

-   Groq chosen for **speed + structured JSON output**

-   Rule-based fallback ensures **no breakdown if AI fails**

-   Context API used instead of Redux (light state complexity)

-   UI prioritized for **desktop first** as per assignment

* * * * *

Future Enhancements (Optional)
---------------------------------

-   Task reminders (email/push)

-   Repeating tasks & subtasks

-   Suggest the next tasks using scoring algorithms.

-   Analytics dashboard

* * * * *

Contact / Author
-------------------

**Developed by:** *Shreya Gore*\
shreyagore68@gmail.com
