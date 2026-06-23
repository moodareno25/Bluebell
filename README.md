# Bluebell - Professional E-commerce Platform

## 📱 Project Overview

Bluebell is a professional e-commerce platform for electronics store with two main interfaces:
- **Customer Website**: Browse products, search, view categories, and manage shopping cart
- **Admin Dashboard**: Manage products, categories, discounts, and inventory

## 🎯 Features

### Customer Website
- 🔍 Real-time search functionality
- 📂 Product categories (8 main categories)
- 🎁 Special offers and discounts section
- 🎲 Random product samples
- 🛒 Shopping cart functionality
- 📱 Responsive design with luxury aesthetics

### Admin Dashboard
- ➕ Add/Edit/Delete products and categories
- 🖼️ Image management (main, additional, and description images)
- 💰 Price and discount management
- 📊 Inventory status (In Stock/Out of Stock)
- 🏷️ Category selection with visual feedback
- 🔍 Search and filter functionality

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Frontend**: React (Customer Website)
- **Admin Panel**: React
- **Image Storage**: Local file system

## 📁 Project Structure

```
Bluebell/
├── server.js              # Main server file
├── config/               # Configuration files
├── models/               # Database schemas
├── routes/               # API routes
├── controllers/          # Route controllers
├── middleware/           # Custom middleware
├── Images/               # Product images storage
├── client/               # Customer website (React)
├── admin/                # Admin dashboard (React)
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/moodareno25/Bluebell.git
cd Bluebell
```

2. Install backend dependencies
```bash
npm install
```

3. Create `.env` file in root directory
```
MONGODB_URI=mongodb://localhost:27017/bluebell
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

4. Run the server
```bash
npm run dev
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Made with ❤️ for Bluebell Store**
