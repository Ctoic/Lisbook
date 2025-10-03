# Lisbook - React Audiobook Platform

A modern, responsive audiobook streaming platform built with React.js, Tailwind CSS, and React Router DOM.

## 🎵 Features

- **Multi-language Support**: Available in English, French, Spanish, and Chinese
- **Audio Player**: Full-featured player with speed control, chapter navigation, and progress tracking
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark UI with green accent colors
- **Book Library**: Browse and search through extensive audiobook collection
- **Chapter Navigation**: Jump between chapters and tracks easily
- **Progress Tracking**: Resume where you left off

## 🛠️ Tech Stack

- **React.js**: Frontend framework
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and development server
- **Context API**: State management for language and theme

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BookCard.jsx    # Book display card
│   ├── Footer.jsx      # Footer component
│   └── Navbar.jsx      # Navigation bar
├── context/            # React Context providers
│   ├── LanguageContext.jsx  # Language management
│   └── ThemeContext.jsx     # Theme management
├── data/              # Static data and configurations
│   ├── books.js       # Book data and utilities
│   └── translations.js # Multi-language translations
├── pages/             # Page components
│   ├── About.jsx      # About page
│   ├── BookPlayer.jsx # Audio player page
│   ├── Contact.jsx    # Contact form page
│   ├── Explore.jsx    # Book browsing page
│   ├── FAQ.jsx        # Frequently asked questions
│   └── Home.jsx       # Landing page
├── App.jsx            # Main app component
├── main.jsx          # App entry point
└── index.css         # Global styles and Tailwind imports
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ for audiobook lovers**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
