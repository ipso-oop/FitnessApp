 FitnessApp

FitnessApp is a web application designed to help users track their fitness data, including steps, calories, and distance. The application uses MongoDB for data storage and Express.js for the server-side framework. The app also includes user authentication and session management.

## Features

* User registration and login
* User authentication and session management
* Add and view fitness data (steps, calories, distance)
* Dashboard to display fitness data
* Logout functionality

## Technologies Used

* Node.js
* Express.js
* MongoDB
* EJS (Embedded JavaScript templates)
* bcrypt for password hashing
* dotenv for environment variable management
* express-session for session management
* Bootstrap for styling

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd FitnessApp
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGODB_URI=<your-mongodb-uri>
   MONGODB_DB_NAME=<your-database-name>
   SESSION_SECRET=<your-session-secret>
   NODE_ENV=development
   ```

4. Start the application:
   ```bash
   npm start
   ```

## File Structure

* `app.js`: Main application file containing the server setup, routes, and MongoDB connection.
* `netlify.toml`: Configuration file for deploying the app on Netlify.
* `netlify/functions/api.js`: Serverless function handler for Netlify.
* `package.json`: Contains the list of dependencies and scripts for the project.
* `views/comment.ejs`: EJS template for the comment page.
* `views/dashboard.ejs`: EJS template for the dashboard page.
* `views/index.ejs`: EJS template for the home page.
* `views/login.ejs`: EJS template for the login page.
* `views/register.ejs`: EJS template for the registration page.

## Usage

1. Register a new user account.
2. Log in with the registered account.
3. Add fitness data (steps, calories, distance) through the dashboard.
4. View the added fitness data on the dashboard.
5. Log out when done.

## Deployment

The application can be deployed on Netlify using the provided `netlify.toml` configuration file. Ensure that the environment variables are set correctly in the Netlify dashboard.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
