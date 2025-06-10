# Food Delivery Application

A modern food delivery web application built with React and Node.js, featuring a seamless user experience for ordering food online.

## Core Functionality

### User Authentication
- User registration and login system
- Secure JWT-based authentication
- Protected routes for authenticated users
- Persistent login state with local storage
- User profile management

### Menu & Ordering
- Browse restaurant menu with categories
- Detailed food item information including:
  - Item name and description
  - Price and ratings
  - Add to cart functionality
- Real-time cart management
- Cart preview on hover
- Order placement with delivery details

### Order Tracking
- Real-time order status updates
- Order preparation progress tracking
- Order history for logged-in users
- Latest order status display
- Order details view

### Navigation & UI Features
- Responsive navigation bar
- Dynamic menu highlighting
- Smooth scrolling to sections
- Cart icon with item count indicator
- User profile display in navbar
- Search functionality (UI ready)

### Cart System
- Add/remove items
- Quantity adjustment
- Real-time price calculation
- Cart preview on hover
- Persistent cart data
- Checkout process

### User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation
- Clear error handling
- Loading states for better UX
- Form validation

## Technical Features

### Frontend
- React.js for UI components
- React Router for navigation
- Context API for state management
- CSS for styling
- Responsive design
- Component-based architecture

### Backend
- Node.js with Express
- MongoDB database
- JWT authentication
- RESTful API endpoints
- Error handling middleware
- Data validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd Food-Delivery-Front-End
   npm install

   # Backend
   cd backend
   npm install
   ```
3. Set up environment variables
4. Start the development servers:
   ```bash
   # Frontend
   npm start

   # Backend
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/users/register` - User registration
- POST `/api/users/login` - User login
- GET `/api/users/profile` - Get user profile

### Orders
- POST `/api/orders` - Create new order
- GET `/api/orders/latest` - Get latest order
- GET `/api/orders/:id` - Get order details

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product details

## Security Features
- JWT token authentication
- Password hashing
- Protected routes
- Input validation
- Error handling

## Future Enhancements
- Payment gateway integration
- Real-time order tracking
- Push notifications
- User reviews and ratings
- Restaurant management system
- Delivery partner integration
