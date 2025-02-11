#Installation and Working Steps 📥

1. Clone the Repository
Clone the repository to your local machine:
git clone https://github.com/your-repository/compliment-management-frontend.git

3. Install Dependencies 📦
Navigate to the project directory:
"cd compliment-management-frontend"
Install the required dependencies using npm:

"npm install"

3. Set Up Environment Variables 🔐
In the project root, create a .env file to store any necessary environment variables (like API base URL or JWT secret). Example:
REACT_APP_API_BASE_URL=http://localhost:5000/api

5. Start the Development Server 🚀
Run the following command to start the development server:

"npm run dev"

The app should now be accessible in your browser at http://localhost:5173.

6. Test the Application 🔍
Ensure all routes (Login, Registration, Customer Dashboard, Admin Dashboard) are accessible and functional.

7. Backend Setup (for Complete Functionality) ⚙️
Make sure the backend (Node.js + MySQL) is running.
If you don't have the backend set up, follow the backend setup steps in its documentation to get it running.

9. Authentication 🔑
Login: Use the login form with your username and password. Upon success, the system stores a JWT token in localStorage.
Registration: Create a new account via the registration form, providing the necessary details (username, password, role).

11. Routing and Navigation 🚦
Ensure that React Router handles the page navigation correctly (e.g., /login, /signup, /admin, /customer).

13. Styling 🖌️
Tailwind CSS will apply responsive and utility-first styling across all components, making the application adaptive to different screen sizes.

15. Troubleshooting 🔧
Check the browser's console for error messages.
Verify that the backend API is up and running.
Ensure that JWT tokens are stored correctly in localStorage after login.
