# Portfolio - Full Stack Application

A modern, responsive portfolio web application built with React and Vite on the frontend, and Node.js/Express on the backend. Showcase your projects, skills, and experience with a sleek, interactive interface.

## ✨ Features

### Frontend
- **Responsive Design** - Mobile-first approach with beautiful UI
- **Dark/Light Theme Toggle** - Customizable theme switching
- **Smooth Animations** - Scroll-triggered animations for engaging experience
- **Authentication** - Secure login and signup functionality
- **Dynamic Sections**
  - Hero Section - Eye-catching introduction
  - About Section - Personal background and experience
  - Projects Section - Display portfolio projects with cards
  - Skills Section - Showcase technical skills
  - Contact Section - Get in touch functionality
- **Project Showcase** - Detailed project cards with descriptions
- **Star Background** - Animated background effect

### Backend
- **RESTful API** - Complete REST endpoints for all features
- **User Authentication** - Secure JWT-based auth system
- **Database Integration** - MongoDB support
- **File Upload** - Project and profile media upload
- **Validation** - Input validation for all endpoints
- **Error Handling** - Comprehensive error middleware
- **Services Architecture** - Clean separation of concerns

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Modern build tool
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **CSS3** - Modern styling with animations
- **ESLint** - Code quality

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Multer** - File upload handling
- **Dotenv** - Environment configuration

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance

### Frontend Installation

```bash
cd Frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Backend Installation

```bash
cd Backend
npm install
```

### Environment Setup

Create a `.env` file in the Backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run Backend Server

```bash
npm start
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

### Frontend Structure
```
src/
├── app/                    # Main app configuration
│   ├── App.jsx            # Root component
│   ├── app.routes.jsx     # Route definitions
│   ├── app.store.js       # Redux store
│   └── useScrollAnimations.js
├── features/              # Feature modules
│   ├── auth/             # Authentication module
│   ├── home/             # Home page module
│   └── shared/           # Shared components & utilities
├── main.jsx              # Entry point
└── index.css             # Global styles
```

### Backend Structure
```
src/
├── app.js                # Express app setup
├── config/              # Configuration files
├── controllers/         # Route controllers
├── middlewares/         # Custom middlewares
├── models/             # Database models
├── routes/             # API routes
├── services/           # Business logic
├── utils/              # Utility functions
└── validators/         # Input validation
```

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start server
- `npm run dev` - Run with nodemon (if configured)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication. Users can:
- Create an account via signup
- Login with credentials
- Maintain session with secure tokens
- Protected routes for authenticated users

## 📧 Contact & Messaging

Users can:
- Send contact messages through the Contact Section
- Messages are stored in the database
- Admin can view and manage messages

## 🎨 Customization

### Adding Projects
1. Navigate to the Projects Section
2. Use the admin interface to add new projects
3. Upload project images and descriptions

### Managing Skills
1. Use the admin Skills management
2. Add, edit, or delete skills
3. Organize by categories

## 🐛 Troubleshooting

### Port Already in Use
- Change port in `.env` or backend config
- Kill the process using the port

### MongoDB Connection Issues
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure database credentials are correct

### CORS Issues
- Verify backend CORS configuration
- Check frontend API base URL

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.