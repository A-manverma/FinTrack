# Fintrak Setup Instructions

Production-ready Family & Friend Expense Tracker.

## Prerequisites
- Node.js (v18+)
- PostgreSQL Database
- npm or yarn

## Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL credentials.
4. Run Prisma migrations & seed:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

## Key Features
- **Daily Expense Entry**: Optimized for mobile-first UPI tracking.
- **Family Sharing**: Create groups and track shared bills.
- **Analytics**: Beautiful charts for monthly spending patterns.
- **Security**: JWT-based auth with backend-enforced ownership.
