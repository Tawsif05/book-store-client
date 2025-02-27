# Book Store Frontend

This is the frontend part of the Book Shop application, built with React. It allows users to browse books, register/login, place orders, and manage their profile. The application is responsive, and provides smooth interactions.

## Features

- **User Registration & Login**: Secure registration with JWT-based login and role-based authentication.
- **Product Management**: Display products with filters, product details, and a "Buy Now" button.
- **Checkout & Payment**: Order products and integrate SurjoPay for payment.
- **Role-Based Dashboard**: Admin can manage users, products, and orders. Users can view their orders and update their profile.
- **Responsive UI**: The application works seamlessly across all devices.

## Tech Stack

- React
- Redux (for state management)
- React Router (for routing)
- Ant Design (UI library)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Tawsif05/book-store-client.git
    ```

2. Navigate into the project folder:

    ```bash
    cd book-store-client
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

    The server will run at `http://localhost:5000` by default.

### 5. Test the API

- Use **Postman** or any API testing tool to interact with the API endpoints.
- Alternatively, you can use a browser to test GET endpoints.

## Available Script
- `npm run dev`: Starts the server in development mode with live reloading.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the compiled production build.

## Requirements
Make sure the following software/tools are installed on your system:

- **Node.js**: Version 16 or higher.
- **npm**: Comes with Node.js.
- **MongoDB**: Either a local instance or a cloud instance (e.g., MongoDB Atlas).

## Live Link

- Deployed at: https://book-store-client-delta.vercel.app/

### 6. Set Environment Variables
Create a `.env` file in the root directory of the project and add the following configuration:

```env

VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_present

```


