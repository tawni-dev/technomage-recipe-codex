# 🔮 Technomage Recipe Codex

**Cyberpunk nutrition protocols for human optimization ⚡ Ghost-in-the-shell aesthetic meets transformation cooking**

A full-stack recipe management application built with Angular frontend and Express backend, featuring a stunning cyberpunk aesthetic with neon green and pink accents.

## 🚀 Features

- **Beautiful Cyberpunk UI** - Dark theme with neon accents and smooth animations
- **Recipe Management** - Create, read, update, and delete recipes
- **Advanced Search & Filtering** - Search by title, ingredients, or tags
- **Tag System** - Categorize recipes with custom tags
- **Responsive Design** - Works perfectly on desktop and mobile
- **Light/Dark Mode Toggle** - Switch between themes
- **Social Sharing** - Share recipes on Twitter, Facebook, Reddit
- **Print Functionality** - Print recipes in a clean format
- **Expandable Cards** - Click to expand recipe details

## 🛠 Tech Stack

### Frontend
- **Angular 17** - Modern component-based framework
- **TypeScript** - Type-safe development
- **SCSS** - Advanced styling with CSS variables
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing

### Database (Future)
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js

### Deployment
- **Frontend** - Vercel (Angular)
- **Backend** - Heroku/Azure (Express)
- **Database** - Railway/Supabase (PostgreSQL)

## 📁 Project Structure

```
technomage-recipe-codex/
├── client/                 # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   ├── recipe-list/
│   │   │   │   ├── recipe-card/
│   │   │   │   └── theme-toggle/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── app.component.ts
│   │   ├── styles.scss
│   │   └── index.html
│   ├── package.json
│   └── angular.json
├── server/                 # Express backend
│   ├── routes/
│   │   └── recipes.js
│   ├── controllers/
│   │   └── recipeController.js
│   ├── server.js
│   └── package.json
├── Procfile               # Heroku deployment
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Frontend Setup
```bash
cd client
npm install
npm start
```
Frontend will be available at `http://localhost:4200`

### Backend Setup
```bash
cd server
npm install
npm start
```
Backend will be available at `http://localhost:3000`

### Development Mode
```bash
# Terminal 1 - Frontend
cd client
npm start

# Terminal 2 - Backend  
cd server
npm run dev
```

## 📡 API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `POST /api/recipes/seed` - Seed with sample data

### Health Check
- `GET /api/health` - API health status

## 🎨 Design System

### Colors
- **Primary Green**: `#80FF00` (Neon Green)
- **Primary Pink**: `#FF44CC` (Neon Pink)
- **Background**: `#181c1b` (Dark)
- **Text**: `#fff` (White)
- **Card Background**: `#222` (Dark Gray)

### Typography
- **Headers**: Orbitron (900 weight)
- **Body**: Hack (300 weight)

### CSS Variables
The app uses CSS custom properties for consistent theming:
```scss
:root {
  --bg: #181c1b;
  --text: #fff;
  --neon-green: #80FF00;
  --neon-pink: #FF44CC;
  // ... more variables
}
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:
```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:4200
```

### CORS Configuration
The backend is configured to accept requests from the Angular frontend. Update the `CLIENT_URL` in your environment variables for production.

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/dist/technomage-recipe-codex`
4. Deploy!

### Backend (Heroku)
1. Create a new Heroku app
2. Connect your GitHub repository
3. Set environment variables in Heroku dashboard
4. Deploy!

### Database (Railway/Supabase)
1. Create a PostgreSQL database
2. Update `DATABASE_URL` in environment variables
3. Run database migrations (future feature)

## 🎯 Future Enhancements

- [ ] PostgreSQL database integration
- [ ] User authentication and authorization
- [ ] Recipe ratings and reviews
- [ ] Recipe categories and collections
- [ ] Image upload for recipes
- [ ] Recipe scaling functionality
- [ ] Nutritional information calculation
- [ ] Recipe import/export
- [ ] Mobile app (React Native/Ionic)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Ghost in the Shell, Cyberpunk 2077
- **Fonts**: Google Fonts (Orbitron, Hack)
- **Icons**: Emoji and custom icons
- **Color Palette**: Cyberpunk aesthetic with accessibility in mind

---

**Built with ❤️ by Technomage**  
*Transforming cooking through technology and style*
