# 📒 Phonebook

A full-stack phonebook application where users can manage contacts — add, update, and delete phone numbers with real-time feedback.

> 🤖 **This project was built with AI assistance ([Claude](https://claude.ai), by Anthropic).** See the [AI Assistance](#-ai-assistance) section for more details.

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
| MongoDB | - |
| Mongoose | 8.x |
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

## Postman Tests

All endpoints were tested manually using [Postman](https://www.postman.com/). Below is a summary of the scenarios covered:

### GET `/api/persons`
- Returns the full list of contacts as a JSON array.

### GET `/api/persons/:id`
- Returns a single contact by ID.
- Tested with a valid MongoDB ObjectId — returns `200 OK` with the contact object.
- Tested with an invalid/malformatted ID — returns `400 Bad Request` with `{ error: 'malformatted id' }`.
- Tested with a valid but non-existent ID — returns `404 Not Found`.

### POST `/api/persons`
- Created a new contact with a valid name and phone number — returns `201 Created` with the saved object.
- Tested with a name shorter than 3 characters — returns `400 Bad Request` with `{ error: 'Path \`name\` ... is shorter than the minimum allowed length (3).' }`.
- Tested with a duplicate name — returns `400 Bad Request` with a unique constraint error.
- Tested with a number that doesn't match the format `dd-dddddd` or `ddd-ddddd` — returns `400 Bad Request` with `{ error: 'Number must be in format dd-ddddd or ddd-ddddd' }`.
- Tested with a duplicate number — returns `400 Bad Request` with a unique constraint error.

### PUT `/api/persons/:id`
- Updated the phone number of an existing contact with a valid format — returns `200 OK` with the updated object.
- Tested with a number that doesn't match the regex format — returns `400 Bad Request` with the custom validator message.
- Tested with a malformatted ID — returns `400 Bad Request` with `{ error: 'malformatted id' }`.

### DELETE `/api/persons/:id`
- Deleted an existing contact — returns `204 No Content`.
- Tested with a non-existent ID — returns `204 No Content` (idempotent behavior).

### GET `/api/info`
- Returns the total number of contacts in the database and the current server timestamp.

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
├── models/
│   └── person.js       # Mongoose schema and model
├── index.js            # Express server entry point
├── package.json
├── eslint.config.mjs   # ESLint flat config
├── fly.toml            # Fly.io configuration
└── Dockerfile
```

---

## 🤖 AI Assistance

This project was developed as part of the [Full Stack Open](https://fullstackopen.com) course by the University of Helsinki, with assistance from [Claude](https://claude.ai) (Claude Sonnet model, by Anthropic).

### How Claude helped

**ESLint configuration**
- Migration from the legacy `.eslintrc.js` format to the new flat config (`eslint.config.mjs`) introduced in ESLint 9.x.
- Installation and configuration of `@stylistic/eslint-plugin` for style rules (indentation, quotes, semicolons, spacing).
- Configuration of rules: `eqeqeq`, `no-trailing-spaces`, `object-curly-spacing`, `arrow-spacing`, `no-console`.
- Resolution of lint errors: CRLF vs LF line endings, unused variables, migration from `.eslintignore` to the `ignores` property in the flat config.
- Configuration of `argsIgnorePattern: '^_'` to allow intentionally unused parameters (such as `_next` in the Express error handler).

**Backend with Express and Mongoose**
- Schema validation with Mongoose: built-in validators (`minLength`, `required`) and custom validators (phone number format).
- Implementation of error-handling middleware for `CastError` and `ValidationError`.
- Implementation of the PUT route using `findByIdAndUpdate` with the `runValidators` option.
- Explanation of Express concepts: difference between route handlers and middleware, how the error-handling middleware chain works.

**Frontend with React**
- Displaying error messages in the frontend using React state.

---

## License

This project was developed as part of the [Full Stack Open](https://fullstackopen.com) course by the University of Helsinki.
