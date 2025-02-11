# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
Compliment Management System - Frontend Process Documentation 🎨

👉 Overview 🌐
The Compliment Management System frontend allows users to interact with the system, enabling them to register, log in, view, create, and manage compliments. This document outlines the key processes, components, and technologies used in the frontend.

👉 Frontend Technologies ⚙️
2.1 React.js ⚛️
The React.js library is used for building the user interface (UI). It allows for the creation of reusable UI components that manage their state efficiently.
2.2 Axios 🌐
Axios is used for making HTTP requests from the frontend to the backend API. It facilitates communication between the React components and the backend (Node.js + MySQL).
2.3 React Router 🛣️
React Router handles routing and navigation, allowing the frontend to manage different pages such as the login, registration, customer, and admin dashboards.
2.4 Tailwind CSS 🎨
Tailwind CSS is used for styling the application. It provides utility-first CSS classes that enable rapid UI development and responsiveness.

👉3. User Registration and Authentication 🔐
3.1 User Registration 📝
The user registration page allows new users to create an account by providing a username, password, and role (either customer or admin).
Upon submission, the frontend sends the registration data to the backend via Axios.
3.2 User Login 🔑
The login page prompts the user for their username and password.
Upon successful authentication, the frontend receives a JWT from the backend and stores it in localStorage for future use.

👉 User Roles 🎭
4.1 Role-Based Access 🔑
Depending on the role (either admin or customer), users will be redirected to different dashboards:
Admin Dashboard 🛠️: Provides access to view and manage all compliments.
Customer Dashboard 🧑‍💼: Allows users to view their own compliments and submit new ones.

👉 Compliment Management (CRUD Operations) 💬
5.1 Creating Compliments ✍️
Customers can create new compliments by submitting a form containing a subject and description.
The compliment is sent to the backend, where it is stored in the database.
5.2 Viewing Compliments 👀
Customers can view a list of their own compliments, while admins have access to view all compliments submitted by all users.
Compliments are displayed in a list, and each compliment can be expanded to view the full details.
5.3 Updating Compliment Status 🔄
Admins have the ability to update the status of a compliment (e.g., from open to closed) to track the progress of each compliment.
5.4 Deleting Compliments 🗑️
Admins can delete compliments if necessary (e.g., if they are duplicates or inappropriate).

👉 UI Components 🖥️
6.1 Login Component 🔑
A simple form with username and password fields.
A login button triggers an Axios request to authenticate the user.
6.2 Registration Component 📝
A form where users can input their username, password, and select a role.
A registration button triggers an Axios request to register the user.
6.3 Compliment List Component 📜
Displays a list of compliments based on the user’s role.
Admins can see all compliments, and customers only see their own.
Compliments can be filtered by status or subject.
6.4 Compliment Form Component 📝
Allows customers to submit new compliments by entering a subject and description.
The form sends the new compliment data to the backend.
6.5 Admin Dashboard 🛠️
Provides an interface for admins to view and manage all compliments.
Admins can filter, update status, and delete compliments.
6.6 Customer Dashboard 🧑‍💼
Provides customers with an interface to view their compliments and submit new ones.

👉 Handling Authentication 🔐
7.1 Storing JWT Token 💾
After a successful login, the frontend stores the JWT token in localStorage for persistent authentication.
7.2 Making Authenticated Requests 🌐
Axios sends the JWT token in the Authorization header for requests that require user authentication:
Authorization: Bearer <token>

👉 Routing and Navigation 🛣️
8.1 React Router 🚦
React Router is used to manage navigation between pages such as:
Login Page: /login
Registration Page: /signup
Admin Dashboard: /admin
Customer Dashboard: /customer
The route paths are protected using JWT-based authorization to ensure only authorized users can access specific routes.

👉 Error Handling and Validation ⚠️
9.1 Input Validation 📝
Forms are validated to ensure that the username, password, and compliment inputs are filled out correctly.
If any required field is missing or invalid, an error message is displayed.
9.2 Error Messages ⚡
If the backend responds with an error (e.g., incorrect credentials or invalid inputs), the frontend shows a relevant error message to the user.

👉 User Experience and UI/UX 🌟
10.1 Responsive Design 📱
The frontend is designed to be responsive and works well on both desktop and mobile devices.
Tailwind CSS ensures that the layout adjusts appropriately to different screen sizes.
10.2 User Feedback 💬
Users receive immediate feedback when interacting with the system:
Success messages when compliments are created or updated.
Error messages when login fails or a form is invalid.

👉 Monitoring and Debugging 🛠️
11.1 Error Logging 📜
Errors occurring in the frontend (e.g., failed API calls, unhandled exceptions) are logged to the browser's console for debugging.
11.2 Analytics 📊
Use Google Analytics or other tools to track user interactions and understand how users are interacting with the frontend.


