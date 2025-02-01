# URL Shortener

A full-stack URL shortener application built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to shorten URLs, track the visit history of shortened URLs, and provides user authentication with login and signup functionality. Protected routes are implemented to ensure that only authenticated users can access certain features.

## Features

- **URL Shortening:** Users can input a long URL and get a shortened version.
- **URL Visit History:** Track the number of visits for each shortened URL.
- **Authentication:** Users can sign up and log in to create, view, and track their shortened URLs.
- **Protected Routes:** Only authenticated users can access specific routes like URL creation and visit history tracking.

## Technologies Used

- **Frontend:**
  - React.js
  - React Router
  - Axios (for API requests)
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)

- **Authentication:**
  - JWT (JSON Web Tokens)
  - Bcrypt.js (for hashing passwords)

## Installation

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your system:
- Node.js (>= 12.x)
- npm or yarn
- MongoDB (either locally or use MongoDB Atlas for a cloud database)

