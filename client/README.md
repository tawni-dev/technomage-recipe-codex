# Technomage Recipe Codex - Angular Client

A modern, full-stack recipe management application built with Angular 17 and Express.js.

## Features

- 🎨 **Modern UI**: Clean, responsive design with cyberpunk aesthetic
- 🌙 **Theme Toggle**: Light/dark mode support
- 🔍 **Search & Filter**: Find recipes by title, tags, or ingredients
- 📱 **Responsive**: Mobile-first design
- ⚡ **Fast Loading**: Optimized performance with lazy loading
- 🎯 **Pagination**: Load more functionality instead of endless scroll

## Tech Stack

- **Frontend**: Angular 17, TypeScript, SCSS
- **Styling**: CSS Variables, Inter font, JetBrains Mono
- **Build Tool**: Angular CLI
- **Testing**: Jasmine, Karma

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

### Build

```bash
# Development build
npm run build

# Production build
npm run build -- --configuration production
```

### Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test -- --watch
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── recipe-list/
│   │   ├── recipe-card/
│   │   ├── load-more/
│   │   └── theme-toggle/
│   ├── models/
│   ├── services/
│   └── app.component.ts
├── assets/
├── styles.scss
└── main.ts
```

## Design System

- **Colors**: Acid Green (#80FF00), Hyper Magenta (#FF44CC), Chartreuse (#CCFF00)
- **Typography**: Inter (body), JetBrains Mono (code)
- **Spacing**: Consistent spacing scale with CSS variables
- **Animations**: Smooth transitions and hover effects

## Development

This project uses Angular 17 with standalone components and modern Angular patterns. The design system is consistent with other Aequalia projects.

## License

MIT License 