# Portfolio - Frontend Application

A modern, responsive portfolio web application built with React and Vite. Showcase your projects, skills, and experience with a sleek, interactive interface.

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



## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Modern build tool
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **CSS3** - Modern styling with animations
- **ESLint** - Code quality



## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

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

## 📝 Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔐 Authentication

The application provides secure authentication UI:
- Login and signup pages
- Protected routes for authenticated users
- Session management with tokens

## 📧 Contact Form

The application includes a contact form for users to:
- Send messages through the Contact Section
- Form validation before submission
- User-friendly feedback messages

## 🎨 Customization

Easily customize the application:
- Modify component styling in CSS files
- Update theme colors and fonts
- Customize sections in the home feature module
- Add or remove navigation items

## 🐛 Troubleshooting

### Port Already in Use
- Change port in Vite config or environment settings
- Kill the process using port 5173

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

### Styling Issues
- Check CSS file imports in components
- Verify theme toggle functionality in browser console

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.