  Blog Platform

A modern backend-driven blogging platform that allows users to create posts, like, bookmark, comment, and explore trending content.

 This project was primarily built as a backend standalone system, with a lightweight frontend added later for API demonstration and interaction.

Team Structure (3 Developers)

Developer 1 — User Module and Database Engineer
Responsibilities
- Implemented user authentication and authorization
- Managed user data and security

Key Areas
- models/user.model.js
- MongoDB Atlas / Local DB
- controllers/auth.controller.js
- routes/auth.routes.js
- middleware/authMiddleware.js

Features
- User registration & login
- Password hashing
- JWT authentication
- User profile management


Developer 2 — Post & Notification Module Engineer
Responsibilities
- Built core post and engagement features
- Implemented notification logic

Key Areas
- controllers/post.controller.js
- routes/post.routes.js

Features
- Post CRUD operations
- Like & bookmark functionality
- Trending posts logic
- Notifications for interactions
- Bookmarks API (/posts/bookmarks)

Developer 3 — Comment & Readme
Responsibilities
- Built comment system
- Optimized queries and performance

Key Areas
- models/

Features
- Comment system
- User ↔️ Post ↔️ Comment relationships

Frontend (Optional Integration Layer)

A simple frontend was added to:
- Demonstrate API usage
- Provide UI for testing
- Simulate real-world usage

Key Areas
- src/components/
- src/pages/
- src/services/api.js

Features
- Authentication UI
- Post display (like/bookmark)
- Bookmarks page
- Dashboard
- Navigation


Authentication
- JWT-based authentication
- Secure password hashing
- Protected routes

Posts
- Create, edit, delete posts
- Rich text editor support
- Image upload with preview
- Lazy loading images

Engagement
- Like posts
- Bookmark posts
- View tracking
- Trending posts

Comments
- Add and manage comments
- Structured relationships

Bookmarks
- Save posts
- Dedicated endpoint
- Optimistic UI updates

User Profiles
- Author details
- Avatar support


Tech Stack

Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)

Frontend (Optional)
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- React Quill

Project Structure
blog-backend/
│
├── blog-frontend/    # Optional frontend (API testing & demo)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.jsx
│
├── src/      # Main backend source code
│ ├── controllers/       # Business logic
│ ├── models/       # Mongoose schemas
│ ├── routes/      # API route definitions
│ ├── middleware/         # Auth & custom middleware
│ ├── config/          # DB & app configuration
│ ├── app.js        # Express app setup
│ └── server.js       # Entry point


Installation & Setup

1. Clone the Repository
git clone https://github.com/Zerothvic/blog_backend.git

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key (generate a jwt sectret key)

npm run dev

2.Frontend Setup (Optional)
cd blog-frontend
npm install
npm run dev

API Endpoints
User Routes (/api/auth)
 POST  /register  Register a new user 
 POST  /login  Login user 
 POST  /logout  Logout user 
 GET  /:id  Get author profile 
 POST  /:id/follow  Follow / unfollow user 
 GET  /:id/followers  Get user followers 

  Post Routes (/api/posts)
 GET /  Get all posts 
 GET  /trending  Get trending posts
 GET  /bookmarks  Get bookmarked posts
 GET  /search  Search posts 
 POST  /search Search posts (alternative) 
 GET /author/:id  Get posts by author
 GET  /:id  Get single post
 POST  /  Create post (with image upload) 
 PUT /:id  Update post 
 DELETE  /:id  Delete post 
 POST  /:id/like  Like / unlike post 
 POST  /:id/bookmark  Bookmark / unbookmark post
 POST  /upload-avatar  Upload user avatar 

Comment Routes (/api/comments)
 POST /:id  Add comment to post
 GET  /:postId Get comments for a post
 DELETE  /:id  Delete comment 

Notification Routes (/api/notifications)
 GET  / Get user notifications 
 PUT  /:id/read Mark notification as read


       PROJECT OVERVIEW

JWT authentication with protected routes
RESTful API design
MongoDB relationships (Users ↔️ Posts ↔️ Comments)
Optimistic UI updates
Route conflict handling (/bookmarks vs /:id)
Lazy loading for performance
Notes
Backend is the primary focus of this project
Frontend is included for demonstration purposes only
License
This project is for educational purposes.