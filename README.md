# 📒 Phonebook

A full-stack phonebook application where users can manage contacts — add, update, and delete phone numbers with real-time feedback.

🔗 **Live demo:** [danilordossantosphonebook.fly.dev](https://danilordossantosphonebook.fly.dev/)

---

## Features

- Add new contacts with name and phone number
- Update existing contacts' phone numbers
- Delete contacts from the list
- Filter contacts by name in real time
- Notifications for successful and failed operations

---

## Tech Stack

### Frontend
| Technology | Version |
|---|---|
| React | 19 |
| Vite | 8 |
| Axios | 1.x |
| ESLint | 9.x |

### Backend
| Technology | Version |
|---|---|
| Node.js | 22 |
| Express | 5 |
| Morgan | 1.x |
| CORS | 2.x |
| Nodemon | 3.x |

### Infrastructure
| Technology | Purpose |
|---|---|
| Fly.io | Cloud deployment |
| Docker | Containerization |

---

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/danilordossantos/fullstack-open-backend.git
cd fullstack-open-backend

# Install backend dependencies
npm install
```

### Running locally

**Backend:**
```bash
npm run dev
```
The server will start on `http://localhost:3001`.

**Frontend** (in a separate terminal, from the frontend directory):
```bash
npm install
npm run dev
```
The app will be available on `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/persons` | List all contacts |
| GET | `/api/persons/:id` | Get a contact by ID |
| POST | `/api/persons` | Add a new contact |
| PUT | `/api/persons/:id` | Update a contact's number |
| DELETE | `/api/persons/:id` | Delete a contact |
| GET | `/api/info` | Show total contacts and server time |

---

## Deployment

This project is deployed on [Fly.io](https://fly.io). To deploy your own instance:

```bash
# Build frontend and deploy
npm run deploy:full
```

---

## Project Structure

```
fullstack-open-backend/
├── dist/               # Built frontend (generated)
├── index.js            # Express server entry point
├── package.json
├── fly.toml            # Fly.io configuration
└── Dockerfile
```

---

## License

This project was developed as part of the [Full Stack Open](https://fullstackopen.com) course by the University of Helsinki.
