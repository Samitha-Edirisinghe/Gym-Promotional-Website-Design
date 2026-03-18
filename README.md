# 🏋️ FITNESS SPORT CENTER

A **premium gym promotional website** built with **React, Node.js, and
MySQL** featuring a **luxury dark UI, glassmorphism design, modern
animations, and secure authentication**.

------------------------------------------------------------------------

# 🚀 Project Overview

**FITNESS SPORT CENTER** is a **full-stack gym website** designed to
showcase gym facilities, programs, trainers, and membership plans with a
**modern premium user experience**.

The platform includes **user authentication, advanced search and
filters, dynamic API integration, and responsive design** to deliver a
smooth experience across all devices.

------------------------------------------------------------------------

# 🛠 Tech Stack

## Frontend

-   React 18
-   TypeScript
-   Vite
-   Tailwind CSS
-   Framer Motion
-   React Router
-   React Hook Form
-   Axios
-   React Slick

## Backend

-   Node.js
-   Express.js
-   MySQL
-   JWT Authentication
-   Bcrypt
-   Express Validator

------------------------------------------------------------------------

# 🎨 Design

### Brand Colors

-   Gold --- `#d5a310`
-   Dark Brown --- `#292113`
-   Deep Black --- `#040304`
-   Charcoal Gray --- `#2c2c2c`
-   Soft Light --- `#f1f0eb`

### Fonts

-   Bebas Neue --- Headings
-   Roboto --- Body Text

### UI Features

-   Dark luxury aesthetic
-   Glassmorphism components
-   Smooth animations
-   Fully responsive layout

------------------------------------------------------------------------

# ✨ Features

## 🔐 Authentication

-   User Signup & Login
-   JWT Authentication
-   Password hashing with bcrypt
-   Protected routes

## 🔎 Search & Filters

-   Real-time program search
-   Filter by fitness goal
-   Filter by experience level
-   Filter by duration

## 🌐 Website Sections

-   Hero Section
-   About Gym
-   Services & Programs
-   Trainers
-   Membership Plans
-   Testimonials
-   Contact Form
-   Footer

## 🎯 UX Features

-   Smooth animations (Framer Motion)
-   Interactive carousels
-   Responsive design
-   Toast notifications
-   Dark/Light theme toggle

------------------------------------------------------------------------

# ⚙️ Installation

### 1. Clone Repository

``` bash
git clone https://github.com/your-username/fitness-sport-center.git
cd fitness-sport-center
```

### 2. Install Dependencies

Frontend

``` bash
npm install
```

Backend

``` bash
cd backend
npm install
```

### 3. Create Database

``` sql
CREATE DATABASE fitness_sport_center;
```

### 4. Configure Environment

Create `.env` inside **backend**

    PORT=5000

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=fitness_sport_center

    JWT_SECRET=your_secret_key

### 5. Initialize Database

``` bash
cd backend
node config/initDatabase.js
```

### 6. Run Application

Start backend

``` bash
cd backend
npm run dev
```

Start frontend

``` bash
npm run dev
```

------------------------------------------------------------------------

# 🌐 API Endpoints

### Authentication

    POST /api/auth/signup
    POST /api/auth/login
    GET  /api/auth/me

### Programs

    GET /api/programs
    GET /api/programs/search

### Trainers

    GET /api/trainers

### Memberships

    GET /api/memberships/plans
    POST /api/memberships/subscribe

------------------------------------------------------------------------

# 🗄 Database Tables

-   users
-   programs
-   trainers
-   membership_plans
-   user_memberships
-   testimonials
-   contact_submissions

------------------------------------------------------------------------

# 🔮 Future Improvements

-   Google OAuth login
-   Facebook OAuth login
-   Payment integration
-   Email verification
-   Admin dashboard
-   Class booking system
-   Mobile app

------------------------------------------------------------------------

# 👨‍💻 Author

**Samitha Edirisinghe**

Full Stack Developer

------------------------------------------------------------------------

⭐ If you like this project, please give it a star on GitHub.
