# Gym Management System - Quick Start

Get up and running in 5 minutes!

## Prerequisites
- Node.js 18+ or Docker

## Option 1: Docker (Easiest) ⚡

```bash
# Clone and enter directory
git clone https://github.com/reddevil79/gym.git
cd gym

# Copy environment file
cp .env.example .env

# Start everything
docker-compose up -d

# Access
# Frontend: http://localhost:3000
# Backend: http://localhost:5000/api
# Database UI: http://localhost:8080
```

That's it! 🎉

## Option 2: Local Setup

### Backend
```bash
cd backend
npm install
npm run dev
# Backend running on http://localhost:5000
```

### Frontend (new terminal)
```bash
cd frontend
npm install
npm start
# Frontend running on http://localhost:3000
```

## Configuration

Create `.env` file with your settings:
```env
# Required
NODE_ENV=development
JWT_SECRET=your-secret-key

# Optional - POS Integration
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
SQUARE_APPLICATION_ID=xxxxx
SQUARE_ACCESS_TOKEN=xxxxx
```

See `.env.example` for all options.

## Verify Installation

```bash
# Check health
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","timestamp":"...","environment":"development"}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | `kill -9 $(lsof -t -i:5000)` |
| Docker errors | `docker-compose down && docker-compose up -d` |
| DB connection | Check DATABASE_URL in .env |
| Frontend blank | Clear cache: `npm cache clean --force` |

## Next Steps

1. **Set up POS payments** → Add Stripe/Square keys to `.env`
2. **Customize database** → Edit migrations in `backend/migrations/`
3. **Design UI** → Edit components in `frontend/src/`
4. **Add features** → See [CONTRIBUTING.md](CONTRIBUTING.md)

## Project Structure

```
gym/
├── backend/        # Express API
├── frontend/       # React app
├── docs/          # Documentation
├── docker-compose.yml
└── .env.example
```

## Available Scripts

### Backend
```bash
npm run dev          # Start development server
npm run migrate:up   # Run database migrations
npm test            # Run tests
npm run lint        # Check code quality
```

### Frontend
```bash
npm start           # Start dev server
npm run build       # Create production build
npm test            # Run tests
npm run lint        # Check code quality
```

## Support

- 📖 Full docs: See [README.md](README.md)
- 🔧 Setup guide: See [docs/SETUP.md](docs/SETUP.md)
- 💾 Database: See [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)
- 🤝 Contributing: See [CONTRIBUTING.md](CONTRIBUTING.md)
- 🐛 Issues: [GitHub Issues](https://github.com/reddevil79/gym/issues)

---

**Happy Building!** 💪🏋️
