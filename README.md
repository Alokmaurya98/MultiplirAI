# 🔗 LinkLens — URL Preview Application

A full-stack application that lets users save URLs and automatically generates rich previews with metadata (title, description, image) using Open Graph scraping.

## 📸 Features

- **User Authentication**: Secure signup/login with JWT tokens and bcrypt password hashing
- **URL Preview Generation**: Submit any URL and get a rich preview with title, description, and image
- **Link Management**: Save, view, and delete your link previews
- **Responsive Dashboard**: Beautiful dark-themed UI with glassmorphism design
- **Error Handling**: Graceful fallback when URLs can't be scraped

## 🛠️ Tech Stack

| Layer      | Technology                              |
|------------|------------------------------------------|
| Frontend   | React 18, Vite, React Router, Tailwind CSS v3 |
| Backend    | Node.js, Express.js                      |
| Database   | MongoDB with Mongoose ODM                |
| Auth       | JWT (JSON Web Tokens), bcryptjs          |
| Scraping   | link-preview-js                          |
| HTTP       | Axios (frontend), CORS-enabled           |

> **Note**: This project uses Node.js/Express for the backend by design.

## 📁 Project Structure

```
url-preview-app/
├── client/                  # React frontend
│   ├── src/
│   │   ├── api/             # Axios instance & interceptors
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context (AuthContext)
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Router setup
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind + custom styles
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── server/                  # Express backend
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routers
│   │   └── index.js         # Server entry point
│   ├── .env.example
│   └── package.json
├── .gitignore
├── package.json             # Root scripts (concurrently)
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** v18+ and npm
- **MongoDB** running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Clone the Repository

```bash
git clone <repository-url>
cd url-preview-app
```

### 2. Install Dependencies

```bash
# Install all dependencies (root, server, client)
npm run install-all
```

### 3. Configure Environment Variables

**Server** — Copy `server/.env.example` to `server/.env` and update:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/url-preview-app   # or your Atlas URI
JWT_SECRET=your_super_secret_jwt_key_change_this       # change this!
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**Client** — Copy `client/.env.example` to `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> **Tip**: If using the Vite dev proxy (default config), you don't need to set `VITE_API_URL`.

### 4. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas:** Use your Atlas connection string in `server/.env`.

### 5. Run the Application

```bash
# Run both frontend and backend concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)

## 📡 API Documentation

### Authentication

| Method | Path              | Body                                  | Response                            | Auth |
|--------|-------------------|---------------------------------------|-------------------------------------|------|
| POST   | `/api/auth/signup` | `{ name, email, password }`          | `{ success, token, user }`          | No   |
| POST   | `/api/auth/login`  | `{ email, password }`                | `{ success, token, user }`          | No   |
| GET    | `/api/auth/me`     | —                                     | `{ success, user }`                 | Yes  |

### Links

| Method | Path              | Body       | Response                              | Auth |
|--------|-------------------|------------|---------------------------------------|------|
| POST   | `/api/links`       | `{ url }`  | `{ success, link }`                   | Yes  |
| GET    | `/api/links`       | —          | `{ success, links, count }`           | Yes  |
| DELETE | `/api/links/:id`   | —          | `{ success, message }`                | Yes  |

### Auth Header Format

```
Authorization: Bearer <jwt_token>
```

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": [{ "field": "email", "message": "Invalid email format" }]
}
```

## 🎨 Design

The application features a premium dark theme with:
- Glassmorphism card effects with backdrop blur
- Indigo/violet accent color palette
- Smooth micro-animations and transitions
- Responsive grid layout (1/2/3 columns)
- Inter font family

## 📄 License

MIT
