# BudgetBuddy

BudgetBuddy is a full-stack student finance management web application developed as a Web Application Laboratory project. It helps students record income, track expenses, define category-wise budgets, monitor savings goals, upload receipt images, and view financial insights through a modern dashboard interface.

The project follows a client-server architecture with a React + Vite frontend, an Express.js backend API, and a MySQL relational database.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Application Workflow](#application-workflow)
- [Laboratory Learning Outcomes](#laboratory-learning-outcomes)
- [Limitations and Future Improvements](#limitations-and-future-improvements)

---

## Project Overview

BudgetBuddy is designed for students who want a simple but complete system for managing personal finances. The application allows a user to create an account, sign in securely, and manage financial records from a private dashboard.

The system supports:

- User registration and login
- JWT-based route protection
- Income tracking
- Expense tracking with receipt upload
- Budget allocation by category
- Savings goal creation and progress tracking
- Dashboard summaries and analytics
- PDF report generation from frontend views
- MySQL database persistence

---

## Key Features

### 1. Authentication

- User signup with name, email, phone number, and password
- Secure password hashing using `bcryptjs`
- User login using email and password
- JWT token generation after successful authentication
- Protected API routes using authorization middleware
- Forgot password flow using a 6-digit reset code stored in the database

### 2. Dashboard

The dashboard provides a summarized view of the user's financial condition:

- Total balance
- Monthly allowance / income
- Year-to-date expenses
- Remaining budget
- Today's spending
- Category-wise monthly spending
- Active savings goal progress

### 3. Income Management

- Add income entries with source, category, amount, and date
- View recent income activity
- Categorize income as part-time job, scholarship, freelance, allowance, or other
- Visualize income distribution
- Generate a PDF report of recent income activity using `html2canvas` and `jsPDF`

### 4. Expense Management

- Add expenses with category, amount, date, and description
- Upload receipt images for expenses
- View all expenses in a searchable and filterable table
- Filter expenses by date range and category
- Delete expenses securely by authenticated user
- Preview uploaded receipts in a modal viewer

### 5. Budget Management

- Add or update category-wise monthly budget limits
- Track spending against allocated budget
- Compare current spending with previous month spending
- View category utilization with progress indicators and charts
- Generate a monthly financial statement PDF

### 6. Savings Goals

- Create savings goals with name, target amount, target date, and notes
- Add savings deposits to active goals
- Track goal completion percentage
- Separate active and completed goals
- Display goal progress using visual progress bars and circular indicators

### 7. Financial Insights

- Calculate total income, total expense, and net savings
- Identify highest expenses
- Display category-wise expense breakdown
- Show weekly spending trends
- Show savings history for recent months

### 8. Responsive User Interface

- Modern React-based single-page application
- Dashboard layout with sidebar navigation
- Mobile-friendly bottom navigation
- Custom color system and typography
- Material Symbols icons
- Tailwind CSS utility classes loaded through CDN configuration

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Frontend development server and build tool |
| React Router DOM | Client-side routing |
| Axios | HTTP requests to backend API |
| Tailwind CSS | Utility-first styling through CDN configuration |
| Material Symbols | Icon set used across the interface |
| html2canvas | Converts UI sections into canvas images for reports |
| jsPDF | Generates downloadable PDF reports |
| Lucide React | Additional icon dependency |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API server |
| MySQL2 | MySQL database connection and queries |
| bcryptjs | Password hashing |
| JSON Web Token | Authentication token generation and verification |
| Multer | Receipt image upload handling |
| CORS | Cross-origin request support |
| PDFKit | PDF-related backend dependency, currently available for future backend report generation |

### Database

| Technology | Purpose |
|---|---|
| MySQL | Relational database for users, incomes, expenses, budgets, goals, and password resets |

---

## System Architecture

BudgetBuddy uses a three-layer architecture:

```text
Frontend Client
React + Vite
        |
        | HTTP requests with Axios
        v
Backend API
Express.js + JWT Middleware
        |
        | SQL queries using mysql2
        v
Database
MySQL: budget_buddy
```

### Request Flow

1. A user interacts with the React frontend.
2. Axios sends API requests to the Express backend.
3. For protected routes, the frontend includes the JWT token in the `Authorization` header.
4. The backend verifies the token using authentication middleware.
5. Controllers execute SQL queries through the MySQL connection pool.
6. The backend returns JSON responses to the frontend.
7. The frontend updates the dashboard, tables, charts, and forms accordingly.

---

## Project Structure

```text
BudgetBuddy/
├── Backend/
│   ├── config/
│   │   ├── constants.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── budgetController.js
│   │   ├── dashboardController.js
│   │   ├── expenseController.js
│   │   ├── goalController.js
│   │   ├── incomeController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── budget.js
│   │   ├── dashboard.js
│   │   ├── expense.js
│   │   ├── goal.js
│   │   ├── income.js
│   │   └── upload.js
│   ├── uploads/
│   ├── package.json
│   ├── schema.sql
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AddCategory.jsx
│   │   │   ├── AddExpense.jsx
│   │   │   ├── AddSavings.jsx
│   │   │   ├── Budget.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Expenses.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Goals.jsx
│   │   │   ├── Income.jsx
│   │   │   ├── InitiateGoal.jsx
│   │   │   ├── Insights.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── SignIn.jsx
│   │   │   └── SignUp.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Database Design

The application uses the database named `budget_buddy`.

### Main Tables

#### `users`

Stores registered user information.

| Column | Description |
|---|---|
| `id` | Primary key |
| `name` | User's full name |
| `email` | Unique email address |
| `password` | Hashed password |
| `phone` | Optional phone number |
| `created_at` | Account creation timestamp |

#### `incomes`

Stores user income records.

| Column | Description |
|---|---|
| `id` | Primary key |
| `user_id` | Related user ID |
| `source` | Income source |
| `category` | Income category |
| `amount` | Income amount |
| `date` | Income date |
| `created_at` | Record creation timestamp |

#### `expenses`

Stores user expense records.

| Column | Description |
|---|---|
| `id` | Primary key |
| `user_id` | Related user ID |
| `category` | Expense category |
| `amount` | Expense amount |
| `date` | Expense date |
| `description` | Optional expense description |
| `receipt_url` | Optional uploaded receipt path |
| `created_at` | Record creation timestamp |

#### `budgets`

Stores category-wise budget limits.

| Column | Description |
|---|---|
| `id` | Primary key |
| `user_id` | Related user ID |
| `category` | Budget category |
| `amount_limit` | Allocated budget limit |

#### `goals`

Stores savings goals.

| Column | Description |
|---|---|
| `id` | Primary key |
| `user_id` | Related user ID |
| `name` | Goal name |
| `target_amount` | Required target amount |
| `current_amount` | Current saved amount |
| `target_date` | Optional target completion date |
| `notes` | Optional notes |

#### `password_resets`

Stores temporary reset codes for password recovery.

| Column | Description |
|---|---|
| `id` | Primary key |
| `email` | User email |
| `code` | 6-digit verification code |
| `expires_at` | Code expiration timestamp |
| `created_at` | Code creation timestamp |

---

## API Endpoints

Base backend URL:

```text
http://localhost:5000
```

### Authentication Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/signin` | Sign in and receive JWT token | No |
| `POST` | `/api/auth/forgot-password` | Generate password reset code | No |
| `POST` | `/api/auth/reset-password` | Reset password using code | No |

### Dashboard Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/api/dashboard` | Get summary dashboard metrics | Yes |

### Income Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/api/income` | Get all income records for logged-in user | Yes |
| `POST` | `/api/income` | Create a new income record | Yes |

### Expense Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/api/expenses` | Get all expense records for logged-in user | Yes |
| `POST` | `/api/expenses` | Create a new expense record | Yes |
| `DELETE` | `/api/expenses/:id` | Delete an expense by ID | Yes |

### Budget Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/api/budget` | Get all budgets for logged-in user | Yes |
| `POST` | `/api/budget` | Create or update a category budget | Yes |

### Goal Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/api/goals` | Get all savings goals | Yes |
| `POST` | `/api/goals` | Create a new savings goal | Yes |
| `POST` | `/api/goals/:id/savings` | Add savings amount to a goal | Yes |

### Upload Routes

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `POST` | `/api/upload` | Upload a receipt image using form field `receipt` | Yes |

---

## Installation and Setup

### Prerequisites

Install the following software before running the project:

- Node.js 16 or higher
- npm
- MySQL Server
- Git, optional but recommended

Check installed versions:

```bash
node -v
npm -v
mysql --version
```

---

## Running the Application

The backend and frontend must run in separate terminal windows.

### Step 1: Prepare the Database

Start your MySQL server. The backend is configured to connect using:

```text
host: localhost
user: root
password: empty
```

The backend automatically creates the `budget_buddy` database and required tables when the server starts.

Alternatively, manually import the provided SQL schema:

```bash
mysql -u root -p < Backend/schema.sql
```

If your MySQL root user has no password, press Enter when asked for the password.

### Step 2: Run the Backend

```bash
cd Backend
npm install
node server.js
```

Expected output:

```text
MySQL connection generated successfully.
Database tables initialized and verified
Server running on port 5000
```

Backend URL:

```text
http://localhost:5000
```

### Step 3: Run the Frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Environment Variables

### Frontend `.env`

Create or update `Frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### Backend Environment Variables

The backend currently uses default values from `Backend/config/constants.js`:

```js
const JWT_SECRET = process.env.JWT_SECRET || 'budgetbuddy_secret_key_change_me_in_prod';
const PORT = process.env.PORT || 5000;
```

For production or deployment, set environment variables instead of relying on the default secret:

```bash
JWT_SECRET=your_secure_secret_key
PORT=5000
```

---

## Application Workflow

1. The user lands on the public landing page.
2. The user creates an account or signs in.
3. After authentication, the backend returns a JWT token.
4. The frontend stores the token and user data in `localStorage`.
5. Axios automatically attaches the token to future API requests.
6. The authenticated user can manage income, expenses, budgets, and goals.
7. Dashboard and insight pages calculate financial summaries from stored records.
8. Reports can be generated as PDF files from selected frontend views.

---

## Codebase Analysis

### Frontend Analysis

The frontend is organized around route-based pages. `App.jsx` defines the main routes and dashboard layout. `api.js` centralizes Axios configuration and automatically attaches the JWT token from `localStorage`.

Important frontend pages:

- `Landing.jsx`: Public marketing and introduction page
- `SignUp.jsx`: User registration form
- `SignIn.jsx`: User login form
- `ForgotPassword.jsx`: Password recovery interface
- `Dashboard.jsx`: Main financial summary dashboard
- `Income.jsx`: Income entry, distribution, and PDF export
- `Expenses.jsx`: Expense table, filters, delete action, and receipt preview
- `AddExpense.jsx`: Expense creation form with receipt upload
- `Budget.jsx`: Budget allocation, spending comparison, and monthly PDF report
- `AddCategory.jsx`: Budget category creation and update form
- `Goals.jsx`: Active and completed savings goals
- `InitiateGoal.jsx`: Goal creation form
- `AddSavings.jsx`: Savings deposit form
- `Insights.jsx`: Analytical view of income, expenses, savings, and trends

### Backend Analysis

The backend uses a modular Express structure:

- `server.js` initializes Express, middleware, static uploads, database setup, and route mounting.
- `config/db.js` creates the MySQL database, initializes tables, and exposes the connection pool.
- `config/constants.js` stores server-level constants such as port and JWT secret.
- `controllers/` contains business logic for authentication, dashboard data, income, expenses, budgets, goals, and uploads.
- `routes/` maps HTTP endpoints to controller functions.
- `middleware/authMiddleware.js` protects private routes by verifying JWT tokens.
- `middleware/uploadMiddleware.js` configures Multer disk storage for receipt uploads.

### Security Features

- Passwords are hashed before storage.
- JWT tokens protect user-specific data routes.
- SQL queries use parameterized placeholders to reduce SQL injection risk.
- Expense, budget, income, and goal data are filtered by authenticated user ID.
- Uploaded receipt files are limited to 5 MB.

### Important Notes

- The password reset code is printed in the backend console for laboratory/local testing instead of being emailed.
- MySQL credentials are currently hardcoded in `Backend/config/db.js`; this is acceptable for a lab setup but should be moved to environment variables for production.
- The backend has no `start` script in `package.json`, so the server is started directly with `node server.js`.
- The frontend uses Tailwind CSS through a CDN script inside `index.html`, not through a local Tailwind build pipeline.

---

## Laboratory Learning Outcomes

This project demonstrates the following web application development concepts:

- Building a full-stack web application
- Designing a RESTful API with Express.js
- Connecting Node.js with a MySQL database
- Implementing authentication with JWT
- Hashing passwords securely
- Protecting private API routes with middleware
- Managing file uploads with Multer
- Creating a React single-page application
- Implementing client-side routing with React Router
- Managing frontend form state and validation
- Making API calls with Axios
- Generating frontend PDF reports
- Structuring a project into frontend and backend modules
- Working with relational database tables and foreign keys

---

## Limitations and Future Improvements

The current project is suitable for a laboratory demonstration. For a production-level system, the following improvements are recommended:

- Move MySQL host, username, password, and database name to environment variables
- Add a backend `start` script in `Backend/package.json`
- Add stronger validation for all request bodies
- Add MIME-type filtering for uploaded receipts
- Send password reset codes through email instead of logging them to the console
- Add refresh tokens or token expiration handling
- Add edit/update and delete functionality for incomes, budgets, and goals
- Add automated tests for backend APIs and frontend components
- Add role-based access control if admin features are introduced
- Remove committed build artifacts and uploaded sample receipts from version control
- Configure Tailwind CSS locally instead of relying on the CDN for production builds

---

## Author / Course Information

This project was prepared as a Web Application Laboratory project.

Project name: **BudgetBuddy**  
Project type: **Full-stack web application**  
Primary domain: **Student finance management**

---

## License

This project is intended for academic and laboratory use.
