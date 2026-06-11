# Gym Management System - Setup Guide

## Prerequisites

- **Node.js:** 18.x or higher
- **npm:** 9.x or higher
- **Docker:** 20.x (optional, for containerized deployment)
- **Docker Compose:** 1.29.x (optional)

## Installation Methods

### Method 1: Docker Compose (Recommended)

Quickest way to get everything running with all services.

#### Step 1: Clone Repository
```bash
git clone https://github.com/reddevil79/gym.git
cd gym
```

#### Step 2: Create Environment File
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- Stripe keys
- Square keys
- SMTP settings (optional)
- Database credentials

#### Step 3: Start Services
```bash
docker-compose up -d
```

This will start:
- Backend API (http://localhost:5000)
- Frontend (http://localhost:3000)
- PostgreSQL Database
- Redis Cache
- Adminer (DB UI at http://localhost:8080)

#### Step 4: Verify Installation
```bash
# Check all containers are running
docker-compose ps

# View backend logs
docker-compose logs -f backend

# View frontend logs
docker-compose logs -f frontend
```

#### Step 5: Access Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **API Health:** http://localhost:5000/api/health
- **Database UI:** http://localhost:8080

---

### Method 2: Local Development Setup

For development without Docker.

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp ../.env.example .env

# Update .env with your local settings
# Make sure DATABASE_URL points to a local SQLite or PostgreSQL instance

# Run database migrations (when ready)
npm run migrate:up

# Start backend server
npm run dev
```

Backend will run on: `http://localhost:5000`

#### Frontend Setup

In a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will run on: `http://localhost:3000`

---

## Configuration Details

### Database Setup

#### SQLite (Default - Local Development)
```env
DATABASE_URL=sqlite:./data/gym.db
```

SQLite will automatically create the database file. Data persists locally.

#### PostgreSQL (Production-Ready)
```env
DATABASE_URL=postgresql://gym_admin:password@localhost:5432/gym_db
```

Create database first:
```bash
createdb -U postgres gym_db
```

### POS Payment Integration

#### Stripe Setup
1. Go to https://dashboard.stripe.com
2. Get your API keys
3. Add to `.env`:
```env
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

#### Square Setup
1. Go to https://squareup.com/dashboard
2. Create an application
3. Get your credentials
4. Add to `.env`:
```env
SQUARE_APPLICATION_ID=xxxxx
SQUARE_ACCESS_TOKEN=xxxxx
SQUARE_LOCATION_ID=xxxxx
SQUARE_ENVIRONMENT=sandbox
```

### Email Configuration (Optional)

For membership expiry notifications:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@gymapp.com
```

For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833).

---

## Verify Installation

### Backend Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-06-11T10:00:00Z",
  "environment": "development"
}
```

### Test API Endpoints
```bash
# Test members endpoint
curl http://localhost:5000/api/members

# Test payments endpoint
curl http://localhost:5000/api/payments

# Test attendance endpoint
curl http://localhost:5000/api/attendance/today
```

---

## Common Issues & Solutions

### Port Already in Use

**Issue:** `Address already in use`

**Solution:**
```bash
# Find process using port 5000 (Linux/Mac)
lsof -i :5000
kill -9 <PID>

# For Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Docker Connection Refused

**Issue:** `Cannot connect to Docker daemon`

**Solution:**
```bash
# Start Docker service
sudo systemctl start docker

# Or restart Docker Desktop
```

### Database Connection Error

**Issue:** `ECONNREFUSED` or `Connection failed`

**Solution:**
- Check DATABASE_URL in .env
- Ensure database service is running
- Verify credentials are correct
```bash
# For PostgreSQL, test connection
psql -U gym_admin -d gym_db -h localhost
```

### Frontend Not Loading

**Issue:** Blank page or cannot reach http://localhost:3000

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Restart frontend
npm start
```

---

## Development Workflow

### Branch Strategy
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push to branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run with coverage
npm run test:coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

---

## Stopping Services

### Docker Compose
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs -f
```

### Local Development
Press `Ctrl+C` in each terminal window.

---

## Next Steps

1. **Configure POS Payment:** Set up Stripe or Square integration
2. **Customize Database:** Modify schema in `backend/migrations/`
3. **Design UI:** Customize frontend components in `frontend/src/`
4. **Set Up Notifications:** Configure email/SMS for reminders
5. **Deploy:** Follow deployment guide when ready

---

## Support

For issues:
1. Check this guide for solutions
2. Review logs: `docker-compose logs service-name`
3. Open an issue on [GitHub Issues](https://github.com/reddevil79/gym/issues)

---

**Last Updated:** June 2026
