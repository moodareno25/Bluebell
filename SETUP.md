# 🚀 Bluebell Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Setup MongoDB

You have two options:

### Option A: Local MongoDB (Recommended for development)
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Default connection string: `mongodb://localhost:27017/bluebell`

### Option B: MongoDB Atlas (Cloud)
1. Create account at: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `.env` file with your connection string

## Step 3: Create Environment File

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/bluebell
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_in_production
UPLOAD_DIR=./Images
```

## Step 4: Run Backend Server

```bash
npm run dev
```

Server will run on: `http://localhost:5000`

Test it with: `http://localhost:5000/api/health`

## Step 5: Setup Frontend (Client)

```bash
cd client
npm install
npm start
```

Client will run on: `http://localhost:3000`

## Step 6: Setup Admin Dashboard

```bash
cd admin
npm install
npm start
```

Admin will run on: `http://localhost:3001`

---

## 📝 Important Notes

- Keep MongoDB running while developing
- Images are stored in `/Images` folder
- All image paths are relative to this folder
- Never commit `.env` file to GitHub (it's in `.gitignore`)

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB service is running
- Check connection string in `.env`
- MongoDB default port is 27017

### Port Already in Use
- Change PORT in `.env` to another port (e.g., 5001, 5002)
- Or kill the process using the port

### Image Upload Issues
- Make sure `/Images` folder exists
- Check write permissions on the folder
- Images are saved as: `{productName} main0`, `{productName} desc0`, etc.

---

Good luck! 🎉
