# BasaFinder 🏡 - Smart Rental & Housing Solution

🏍️ **Project Overview:**
BasaFinder is a full-stack web application that provides a smart rental housing solution, connecting landlords and tenants seamlessly. This repository contains the frontend of the BasaFinder project, built using Next.js, TypeScript, Tailwind CSS, Shadcn Ui and ShurjoPay for payment integration.

## Live Deployment Link

[Bike-Stores](https://basafinder.vercel.app/)

## Features

- Secure **Registration & Login** (JWT-based authentication)

- Role-based access control (Customer, Admin)
- Logout functionality

- **User Roles:** Admin, Landlord, Tenant

- **Landlord Dashboard:** Post and manage rental properties

- **Admin Panel:** Manage users and listings

- **Filter:** Find rentals based on division, district, category, price

- **Payment Integration:** Secure payment processing via **ShurjoPay**

- **Email Notifications:** Updates for rental requests

## 🏢 Role-Based Dashboard Implementation

**🎯 Dashboard Features**

**Customer Dashboard**

- View and track request
- Update user profile
- Update user password

**Admin Dashboard**

- **Dashboard** - Show all items statistic chart wise

- **Listing Management:** update, delete products

- **All Request Monitor:** View request status

- **User Management:** View all users, update status("blocked", "role")

- \*\*

🎨 **UI/UX & Responsiveness**

- **Responsive Design** (Mobile, Tablet, Desktop)
- Loading states, error handling, and notifications
- **Toast notifications** for important actions

🏗️ **Tech Stack**

- **Frontend:** Next.js, TypeScript, TailwindCSS, Shadcn Ui

- **Backend:** Node.js, Express, MongoDB

**Authentication:** JWT, bcrypt

- **Deployment:** Vercel (Frontend), Vercel (Backend)

- **Payment Gateway:** ShurjoPay

- 💳 **Secure Payment System:**

## Secure Payment Integration with SurjoPay

This project integrates **SurjoPay**, a reliable and secure payment gateway, to manage customer payments efficiently. Here are the key benefits of using SurjoPay:

- **Encryption:** End-to-end encryption to protect sensitive financial data.
- **Fraud Prevention:** Advanced mechanisms to detect and prevent fraudulent transactions.
- **Seamless Checkout:** Provides a fast and user-friendly checkout experience for customers.
- **Multi-currency Support:** Allows customers to pay using various currencies.
- **Payment Status:** Automatic order status updates based on payment confirmations.

**Payment Integration (ShurjoPay)**

- Payment processing is handled via ShurjoPay.

- After a landlord approves a rental request, the tenant can proceed with the payment.

- The backend processes the payment and updates the request status.

## Prerequisites

Ensure you have the following installed:

- npm or yarn

## 🚀 Getting Started

## 1 Clone the Repository

```bash
git clone https://github.com/gopalbasak1/BasaFinder-Frontend.git
cd BasaFinder-Frontend
```

## 2 Install Dependencies

```bash
npm install
```

## 3 Create a redux baseApi

- Create a redux file and add baseApi configure your API URL:

```bash
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_BASE_API=http://localhost:5000/api
NEXT_PUBLIC_SHURJOPAY_MERCHANT_KEY=your_shurjopay_key
NEXT_PUBLIC_SHURJOPAY_MERCHANT_SECRET=your_shurjopay_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_preset
NEXT_PUBLIC_CLOUDINARY_API_URL=https://api.cloudinary.com/v1_1/your_cloud_name/image/upload
  # Replace with your backend URL
```

## 4 Run the Project

- Development: Start the frontend with hot reloading:

```bash
npm run dev
```

- Production: Build and start the server: Start the server with hot reloading:

```bash
npm run build
npm start:prod
```

### Configuration

## Scripts

- `npm run dev`: Run the fronted in development mode with hot reload.
- `npm run build`: Build the project using TypeScript.

## Project Structure

```bash
/personal-portfolio
├── /app
│   ├── /withCommonLayout (Public)
│   │   ├── /home
│   │   ├── /about
│   │   ├── /all-listings
│   │   ├── /faq
│   │   ├── /news
│   │   ├── /privacypolicy
│   │   ├── /rent
│   │   ├── /termsconditions
│   ├── /(widthDashboard)/dashboard(Protected Route)
│   │                     ├── /admin (Manage admin)
│   │                     ├── /landlord (Manage landlord)
│   │                     ├── /tentant (Manage Project)
│   ├── /login (NextAuth Login)
│   ├── /register (NextAuth register)
│   ├── /error
│   ├── /not-found
│   ├── /spinner.css
│   ├── /theme-toggle
│   ├── /api/auth/[...nextauth]
├── /components (Reusable UI Components)
├── /assests (image)
├── /constants
├── /contants
├── /hook
├── /providers(auth)
├── /services(all fetch)
├── /types(all types)
├── /lib (DB & Auth Config)
├── /styles (Global CSS)
├── /public (Static Assets)
├── middleware.ts
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json


```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.
