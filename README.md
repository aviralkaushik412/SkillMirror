# SkillMirror

SkillMirror is a full-stack interview preparation platform designed to help students prepare consistently for technical interviews. It combines daily coding practice, core computer science concepts, aptitude, puzzles, and performance analytics into a single application.

**Live Demo:** https://skillmirror.vercel.app

---

## Features

- Secure user authentication
- Daily DSA questions
- Computer Science theory questions (OS, DBMS, OOPs, CN)
- MCQs and aptitude practice
- Daily puzzle challenges
- Performance analytics and accuracy tracking
- Daily streak tracking
- Leaderboard
- Responsive user interface

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs

### Database

- MongoDB Atlas

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Architecture

```
React Frontend
       │
       │ REST APIs
       ▼
Spring Boot Backend
       │
       ▼
 MongoDB Atlas
```

---

## Project Structure

```
SkillMirror
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── context
│
├── backend
│   ├── controllers
│   ├── services
│   ├── repositories
│   ├── models
│   ├── security
│   └── config
│
└── README.md
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/<your-username>/SkillMirror.git
cd SkillMirror
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

---

## Future Enhancements

- AI-based interview feedback
- Mock interview sessions
- Company-specific interview preparation tracks
- Personalized learning recommendations
- Email reminders
- Weekly progress reports
- Discussion forum

---

## Why SkillMirror?

Interview preparation often requires using multiple platforms for coding practice, theory revision, aptitude, and progress tracking. SkillMirror brings these components together in one application, allowing users to maintain consistency, monitor improvement, and prepare more effectively for technical interviews.

---

## Author

**Aviral Kaushik**

GitHub: https://github.com/<your-username>

LinkedIn: https://linkedin.com/in/<your-linkedin>

---

## License

This project is licensed under the MIT License.
