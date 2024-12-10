
# Beaniverse Coffee Shop
Welcome to Beaniverse, a full-stack e-commerce application for a coffee shop built with React, TypeScript, and Node.js.


## Features
- User authentication (login/signup)
- Admin dashboard for inventory management
- Product catalog with coffee listings
- Responsive design with Material UI components
- State management with Redux Toolkit
- Protected routes based on user roles

## Tech Stack

**Frontend:** 
- React 18 with TypeScript
-  Redux Toolkit for state management
- Material UI components
- Tailwind CSS for styling
- Formik & Yup for form validation
- Axios for API requests
- Vite as build tool

**Backend:**
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/pr0fix/Beaniverse.git
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Set up environment variables in `.env`:
   ```bash
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=3000
   ```
4. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application
1. Start the backend development server:
   ```bash
   cd backend
   npm run dev
   ```
2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
The frontend will be available at `http://localhost:5173` and the backend API will be available at `http://localhost:3000`
