# POSTLY MEAN-Stack Project

## Overview

This is a full-stack simple social media application built using the **MEAN stack (MongoDB, Express.js, Angular, Node.js)**. The platform allows users to create posts, like and comment on posts, and manage their content. It also includes route guards to protect authenticated and unauthenticated routes, ensuring a secure and user-friendly experience.

---

## Technologies Used

### Frontend:
- Angular
- Angular Material
- Bootstrap

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT) for authentication

---

## Features

### Authentication
- User registration and login
- JWT-based auth system
- Route protection using Angular Guards:
  - `AuthGuard`: restricts access to private routes
  - `NoAuthGuard`: prevents access to auth routes if already logged in

### Posts
- Create, and delete posts
- View all posts or only your own posts
- Each post includes a title, content, imgURL ( optional ) , and creation date 

### Likes
- Like and unlike posts
- UI reflects like status in real-time
- Backend ensures a post can only be liked once by the same user

### Comments
- Add and view comments on any post
- Comments load instantly with change detection
- Comment count updates in real-time

---

## Project Structure

```
client/src/app      # Angular frontend
├── components/
├── services/
├── interfaces/
├── environment/
├── layouts/
└── guards/

server/             # Express backend
├── controllers/
├── services/
├── repos/
├── models/
├── routes/
├── config/
├── middlewares/
└── validators/
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/EphraimYoussef/POSTLY-MEAN-Stack-Project
cd POSTLY-MEAN-Stack-Project
```

### 2. Install Dependencies

#### Backend:
```bash
cd server
npm install
```

#### Frontend:
```bash
cd client
npm install
```


### 3. Run the Application

#### Start Backend
```bash
cd server
npm run dev
```

#### Start Frontend
```bash
cd client
ng serve
```

---

## Video
https://github.com/user-attachments/assets/3d13b7c3-5d14-42ea-9862-4d8e69c1a2d1
