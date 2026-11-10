
# Tactyqal Labs – Blog Management System

A full-stack Blog Management System developed as part of the Tactyqal Labs Full Stack Developer Internship Hiring Task.


## Live Demo

- **Frontend Dashboard:** https://dazzling-dodol-f23f71.netlify.app
- **Backend API:** https://tactyqal-blog-admin.onrender.com
- **GitHub Repository:** https://github.com/Naveen9634/tactyqal-blog-admin

## Features

- Create new blog posts
- View all blog posts
- Edit existing posts
- Delete blog posts
- Manage post status (Draft / Published)
- Display total, published, and draft post counts
- Responsive admin dashboard
- Persistent data storage using MySQL

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- CORS

### Database
- TiDB Cloud (MySQL-compatible)

### Deployment
- Netlify – Frontend
- Render – Backend

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/posts | Get all posts |
| POST | /api/posts | Create a post |
| PUT | /api/posts/:id | Update a post |
| DELETE | /api/posts/:id | Delete a post |

## Project Structure

```text
tactyqal-blog/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Naveen9634/tactyqal-blog-admin.git
cd tactyqal-blog-admin
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder with your own database credentials:

```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

Start backend:

```bash
npm start
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## Acknowledgements

- Developed as part of the Tactyqal Labs Full Stack Developer Internship Hiring Task.
- Used ChatGPT for AI-assisted guidance, debugging, and understanding the implementation.

## Author
Developed by Naveen Shrivastav