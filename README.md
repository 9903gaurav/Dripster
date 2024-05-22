# Dripster

## Overview

Dripster is an end-to-end e-commerce website developed using ReactJS for the frontend, Node.js/Express.js for the backend, and MySQL for database management. The project aims to provide a seamless and user-friendly experience for both customers and administrators, offering features for browsing products, making purchases, and managing inventory.

## Features

- **User-Friendly Interface**: Dripster boasts a clean and intuitive interface designed to enhance the shopping experience for users.
- **Product Catalog**: Browse through a wide range of products conveniently categorized for easy navigation.
- **Shopping Cart**: Add desired items to the cart for a streamlined checkout process.
- **Secure Payments**: Integration with Razorpay ensures secure payment transactions.
- **Inventory Management**: Admins can manage product listings and inventory levels efficiently.
- **Scalability**: Utilization of Docker ensures scalability to handle varying levels of traffic and workload.
- **Continuous Integration/Continuous Deployment (CI/CD)**: GitHub Actions automates the CI/CD pipeline for efficient development and deployment processes.
- **Cloud Deployment**: Leveraging AWS EC2 for hosting the application and AWS Lambda for serverless computing.

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: Node.js/Express.js
- **Database**: MySQL
- **Payment Gateway**: Razorpay
- **Deployment**: AWS EC2, Lambda
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

## Installation

To run Dripster locally, follow these steps:

1. Clone the repository
2. Navigate to the project directory: `cd dripster`
3. Install dependencies:
   - For the frontend, navigate to the `frontend` directory and run `npm install`.
   - For the backend, navigate to the `api` directory and run `npm install`.
5. Update CORS policy:
   - In the backend, update the origin URL in `server/app.js` to allow requests from your frontend URL.
6. Start the backend server: Navigate to the `server` directory and run `npm start`.
7. Update API and frontend URLs:
   - In the frontend, update the `baseURL` in `app.js` with your API URL.
   - In the frontend, update the `homeURL` in `app.js` with your frontend URL.
8. Start the frontend server: Navigate to the `frontend` directory and run `npm start`.
9. Access the application in your browser at `http://localhost:3000`.

Thank you for using Dripster! Happy shopping! 🛒🎉
