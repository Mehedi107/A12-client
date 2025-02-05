## Overview
ProdVent is a web platform designed to showcase and discover the latest digital products, including web apps, AI tools, software, games, and mobile apps. Built using the MERN stack (MongoDB, Express.js, React, Node.js), ProdVent allows users to submit, explore, and engage with innovative products.
## Technologies used
- Frontend: React, Tailwind CSS, DaisyUI
- Backend: Node.js, Express.js, MongoDB
- Authentication: Firebase/Auth or JWT-based authentication
- Payment: Stripe (planned integration)

## Features
- Product Listings: Users can submit and showcase their products with descriptions, images, and links.
- User Engagement: Visitors can upvote, comment, and share opinions on listed products.
- Categories & Filtering: Products are categorized for easy navigation, including Web Apps, AI tools, Software, Games, and Mobile Apps.
- Authentication: Secure user login and registration with authentication.
- Admin Dashboard: Moderation tools for managing product submissions and user interactions.
- Stripe Integration (Upcoming): A payment system for premium listings or featured products.

## Dependencies

### Core Dependencies
- **React** – JavaScript library for building user interfaces (`react`, `react-dom`)
- **React Router** – Client-side navigation and routing (`react-router`)
- **Axios** – Promise-based HTTP client for API requests (`axios`)
- **TanStack React Query** – Server-state management (`@tanstack/react-query`)

### UI & Styling
- **Tailwind CSS** – Utility-first CSS framework (`tailwindcss`)
- **DaisyUI** – Component library for Tailwind CSS (`daisyui`)
- **PostCSS** – CSS transformations and processing (`postcss`)
- **Autoprefixer** – Adds vendor prefixes to CSS (`autoprefixer`)

### Authentication & Security
- **Firebase** – Authentication and backend services (`firebase`)

### Payments
- **Stripe** – Payment processing (`@stripe/react-stripe-js`, `@stripe/stripe-js`)

### Forms & Input Handling
- **React Tag Input** – Tagging and keyword input field (`react-tag-input`)

### Data Visualization & Pagination
- **Recharts** – Charts and graphs (`recharts`)
- **React Paginate** – Client-side pagination (`react-paginate`)

### SEO & Meta Tags
- **React Helmet Async** – Manage document head for SEO (`react-helmet-async`)

### Notifications & Alerts
- **React Hot Toast** – Toast notifications (`react-hot-toast`)
- **SweetAlert2** – Stylish popup alerts (`sweetalert2`)

### Swipers & Sliders
- **Swiper** – Sliders and carousels (`swiper`)

## Development Dependencies
- **Vite** – Fast development build tool (`vite`, `@vitejs/plugin-react`)
- **ESLint** – JavaScript and React linting (`eslint`, `@eslint/js`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)
- **TypeScript Type Definitions** – Type support for React (`@types/react`, `@types/react-dom`)
- **Globals** – Provides global variables for ESLint (`globals`)

## Installation Guide

Follow these steps to set up and run the project locally.

### **Prerequisites**
Ensure you have the following installed on your system:
- **Node.js** (Latest LTS recommended) – [Download & Install](https://nodejs.org/)
- **Git** – [Download & Install](https://git-scm.com/)
- **Package Manager**: npm (comes with Node.js) or Yarn

### **Step 1: Clone the Repository**
Open your terminal and run the following command to clone the project:
```sh
git clone https://github.com/Mehedi107/A12-client
```

### **Step 2: Navigate to the Project Directory**
```sh
cd prodvent
```

### **Step 3: Install Dependencies**
```sh
npm install
```
or
```sh
yarn install
```

### **Step 4: Set Up Environment Variables**
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_BACKEND_URL=your_backend_url
```

### **Step 5: Start the Development Server**
```sh
npm run dev
or
yarn dev
```

### **Step 6: Build for Production (Optional)**
```sh
npm run build
```
or
```sh
npm run preview
```

### **You're all set! 🎉**
```vbnet
This guide follows best practices and is **formatted for easy readability in your README.md**. Let me know if you need any modifications!
```
