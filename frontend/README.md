VETI- A Voice-Enabled Task Tracker

=============================

*A smart task management system with voice input, AI parsing, kanban board, list view, drag-and-drop, filters & MongoDB backend.*

* * * * *

Project Overview

-------------------

This project is a **Voice-Enabled Task Management System** that allows users to create and manage tasks using **voice commands** as well as a manual form.

The system parses speech input using **AI (Groq) + fallback rule-based NLP**, extracts details like **title, priority, status, and due date**, and lets users review/edit before saving.

It offers both a **Kanban Board View** and a **List View**, along with **filters, search, editing, deletion, and drag-and-drop status updates.**

* * * * *

Features

----------

### Core Functionality

- Add tasks manually using form modal

- Add tasks using **voice command → converted to text → parsed into task details**

- Edit existing tasks (title, description, status, priority, due date)

- Delete tasks with confirmation popup

- Kanban Board View:

- Columns: **Todo → In-Progress → Done**

- **Drag-and-drop** to update status

- List View alternative display

- Search tasks by title/description

- Filter by **status, priority, due date**

- Responsive UI design

- Persistent data using MongoDB

### 🗣 Voice Processing & AI Parsing

- Uses **Web Speech API** for speech to text

- Backend parser:

- **Primary:** Groq LLM JSON-based extraction

- **Fallback:** Rule-based NLP keyword extraction

- Supports **relative dates**:

> "Tomorrow", "Next Monday", "In 3 days", "After a week"

- Supports **absolute dates**:

> "15 December", "10/02/2025", "25-11-24"

- Users can review & edit before saving

* * * * *

Tech Stack

-------------

### Frontend

- React + Vite

- Context API for state management

- Axios for API calls

- Components: BoardView, ListView, VoiceModal, TaskModal, TaskCard, DeleteModal

### Backend

- Node.js + Express

- RESTful API with CRUD operations

- MongoDB + Mongoose

- AI parsing with **Groq**

- NLP fallback with **chrono-node & keyword extraction**

- Centralized error handling middleware

* * * * *

Project Structure

--------------------

`tasks_system/

├── backend/

│ ├── server.js

│ ├── routes/

│ ├── models/

│ ├── controllers/

│ ├── middleware/

│ ├── utils/ (AI Parser + Fallback)

│ ├── .env.example

│ └── package.json

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

Create `.env` file (copy from `.env.example`)

`MONGO_URI=your_mongo_connection_string

PORT=5000

NODE_ENV=development

GROQ_API_KEY=your_key_here`

Run server:

`npm start`

* * * * *

### 3 Frontend Setup

`cd ../frontend

npm install

npm run dev`

* * * * *

### App Opens At

Frontend → http://localhost:5173

Backend → http://localhost:5000

* * * * *

API Endpoints

----------------

| Method | Endpoint | Description |

| --- | --- | --- |

| POST | `/api/tasks` | Create task |

| GET | `/api/tasks` | Get tasks (supports filters + search) |

| GET | `/api/tasks/:id` | Get single task |

| PUT | `/api/tasks/:id` | Edit task fully |

| PATCH | `/api/tasks/:id` | Update only status |

| DELETE | `/api/tasks/:id` | Delete task |

| POST | `/api/voice/parse` | Parse voice transcript → structured task data |

### Example Voice Payload

`{ "transcript": "Create task prepare resume high priority tomorrow" }`

Response:

`{

"title": "Prepare resume",

"priority": "high",

"status": "todo",

"dueDate": "2024-12-05"

}`

* * * * *

### Using Groq AI for Voice Parsing

The project uses **Groq API** to convert voice-derived text into a structured task format (title, priority, status, due date).

Groq provides fast LLM inference similar to OpenAI, and we use it for **natural language parsing** when users submit voice input.

#### 🔑 Step 1: Get Groq API Key

1. Visit **<https://console.groq.com/>**

2. Sign up / log in

3. Go to **API Keys** section

4. Create a new key

#### 🔧 Step 2: Add Key to Backend `.env`

`GROQ_API_KEY=your_groq_key_here`

Design Decisions & Assumptions

---------------------------------

- Web Speech API used instead of an external STT provider for latency and offline stability

- Groq chosen for faster parsing + JSON structured output

- Rule-based fallback avoids complete failure if AI fails

- Context used instead of Redux as state is localized & simple

- Responsive design focused more on desktop first

* * * * *

What is Completed ?

---------------------------------------

| Manual task add/edit/delete | ✔ Completed |

| Voice-based task creation | ✔ Completed |

| AI parsing & fallback NLP | ✔ Implemented |

| Board view + drag & drop | ✔ Completed |

| List view | ✔ Completed |

| Filters + Search | ✔ Completed |

| Responsive UI | ✔ Completed |

| README | ✔ Completed |

* * * * *

Future Enhancements

---------------------------------------------

- Deadlines reminder notifications

- Email/SMS alerts

- Repeat tasks, subtasks & tags

- Suggestion to next priority task

- Analytics dashboard

* * * * *

Contact

-------------------

**Developed by:** *[Shreya Gore]*

email: shreyagore68@gmail.com