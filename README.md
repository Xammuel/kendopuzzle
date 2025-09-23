# React Todo App

A simple single page React application built with TypeScript and Vite. This project demonstrates modern React development practices including hooks, TypeScript, and responsive design.

## Features

- ✅ Add, complete, and delete todos
- 📊 Real-time statistics (total, completed, pending)
- 📱 Responsive design for mobile and desktop
- ⚡ Fast development with Vite and Hot Module Replacement
- 🎯 TypeScript for type safety
- 🎨 Modern CSS styling with hover effects and transitions

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── main.tsx         # Application entry point
├── index.css        # Global styles
└── vite-env.d.ts    # Vite type definitions
```

## Technologies Used

- **React 18** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with flexbox and animations

## Development

This project uses:
- **Hot Module Replacement (HMR)** for instant updates during development
- **ESLint** for code quality and consistency
- **TypeScript** for compile-time type checking
- **Responsive design** that works on all device sizes

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.
