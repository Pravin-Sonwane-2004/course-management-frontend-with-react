🚀 Course Management Frontend (React)

A clean, responsive frontend for a Course Management System built with 💻 React and integrated with a Spring Boot backend. Supports features like user/instructor/course/assignment modules, authentication, and file upload/download.

## 🧠 Tech Stack

- **React** with functional components & hooks  
- **Redux** for state management  
- **React Router** for client-side routing  
- **Axios** for API calls  
- **JWT Authentication** with private/admin routes  
- **File Upload/Download** capabilities in the assignments module  
- **Spring Boot** backend (ensure backend is running separately)

---

## 🔍 Features

- ✅ CRUD operations on Courses, Instructors, Users, Assignments  
- ✅ Filter courses by instructor  
- ✅ Login-based access: public, private & admin routes  
- ✅ Feedback messages for API operations (success/failure)  
- ✅ Graceful error handling (e.g., server down page)  
- ✅ JWT token expiry redirects to login  
- ✅ Password and username validation checks  
- ✅ File upload/download support

---

## 🚀 Getting Started

### 1. Clone and Navigate

git clone https://github.com/Pravin-Sonwane-2004/course-management-frontend-with-react.git
cd course-management-frontend-with-react/frontend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Configure API Endpoint
Open src/config.js and set:


export const API_BASE_URL = "http://localhost:8080/api";
(Adjust port/path according to your backend setup.)

4. Run the App

npm run dev
Access at: http://localhost:3000

📁 API Endpoints (via Spring Boot Backend)
Assuming backend base URL http://localhost:8080/api:

Resource	Endpoint	Method
Authentication	/auth/login, /auth/register	POST
Users	/users	GET, POST, PUT, DELETE
Instructors	/instructors	GET, POST, PUT, DELETE
Courses	/courses	GET, POST, PUT, DELETE
Assignments	/assignments, /assignments/upload, /assignments/download/:id	GET, POST

🛠️ Contributing
Contributions are welcome! If you'd like to help:

⭐️ Fork the repository

🔧 Create a branch (git checkout -b feature/your-feature)

🛠 Implement changes

📤 Submit a pull request with clear descriptions

☕ Support Me
If you find this project useful, consider buying me a coffee to support my work:


📫 Contact & Links
GitHub: Pravin‑Sonwane‑2004

Buy Me a Coffee: https://coff.ee/devpravin

LinkedIn Portfolio: (https://www.linkedin.com/in/pravin-sonwane-079a621ba/)
