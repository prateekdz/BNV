# MERN Stack User Management Application

A production-ready full-stack MERN (MongoDB, Express, React, Node.js) application for user management with complete CRUD operations, search, pagination, and CSV export functionality.

## Project Structure

```
BNV/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── db.js
│       ├── models/
│       │   └── user.model.js
│       ├── controllers/
│       │   └── user.controller.js
│       ├── routes/
│       │   └── user.routes.js
│       ├── middleware/
│       │   ├── error.middleware.js
│       │   └── async.middleware.js
│       └── utils/
│           └── exportCsv.js
└── frontend/
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── api/
    │   │   └── axios.js
    │   ├── routes/
    │   │   └── AppRoutes.jsx
    │   ├── pages/
    │   │   ├── ListPage.jsx
    │   │   ├── AddEditPage.jsx
    │   │   └── ViewPage.jsx
    │   ├── components/
    │   │   ├── UserTable.jsx
    │   │   ├── UserForm.jsx
    │   │   ├── Pagination.jsx
    │   │   ├── ConfirmDialog.jsx
    │   │   └── Loader.jsx
    │   ├── hooks/
    │   │   └── useUsers.js
    │   ├── utils/
    │   │   └── validation.js
    │   └── styles/
    │       └── global.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env
```

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **json2csv** - CSV export
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Material-UI (MUI)** - Component library
- **React Toastify** - Notifications

## Features

### Backend Features
✅ Create User
✅ Get Users (with pagination)
✅ Get Single User
✅ Update User
✅ Delete User
✅ Search Users (by name/email)
✅ Export Users to CSV
✅ Global Error Handler
✅ Async Middleware
✅ Input Validation
✅ RESTful API

### Frontend Features
✅ User Listing with Table
✅ Pagination
✅ Search Functionality
✅ Add New User
✅ Edit User Details
✅ View User Details
✅ Delete User (with confirmation)
✅ Export to CSV
✅ Form Validation
✅ Toast Notifications
✅ Responsive Design
✅ Professional UI

### User Fields
- **firstName** - Required, minimum 2 characters
- **lastName** - Required
- **email** - Required, unique, valid format
- **phone** - Required, 10 digits
- **age** - Optional, minimum 18
- **gender** - Male/Female/Other
- **status** - Active/Inactive
- **address** - Optional
- **profile** - Optional file upload
- **createdAt** - Auto-generated timestamp

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```
   Create .env file with:
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-user-management
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   ```bash
   mongod
   ```

5. **Run the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

   Server runs on: `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```
   Create .env file with:
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Application runs on: `http://localhost:5173`

## API Endpoints

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create new user |
| GET | `/api/users` | Get all users (paginated) |
| GET | `/api/users/search` | Search users |
| GET | `/api/users/export` | Export users to CSV |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Request Parameters

**Pagination:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Search:**
- `query` - Search query string

### Response Format

Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

Error Response:
```json
{
  "success": false,
  "message": "Error message",
  "error": {}
}
```

## Validation Rules

### Frontend Validation
- First Name: Minimum 2 characters
- Last Name: Required
- Email: Valid email format
- Phone: Exactly 10 digits
- Age: Minimum 18 years
- Gender: Required (Male/Female/Other)
- Email: Must be unique
- Status: Required (Active/Inactive)

### Backend Validation
All frontend validations are enforced on the backend as well.

## Usage Guide

### Creating a User
1. Click "Add User" button
2. Fill all required fields
3. Select gender and status
4. Click "Submit"

### Searching Users
1. Enter search term in search box
2. Search across First Name, Last Name, Email
3. Results update automatically

### Editing a User
1. Click the action menu (⋮) for any user
2. Select "Edit"
3. Update fields
4. Click "Submit"

### Viewing User Details
1. Click the action menu (⋮) for any user
2. Select "View"
3. View all user information

### Deleting a User
1. Click the action menu (⋮) for any user
2. Select "Delete"
3. Confirm deletion in dialog

### Exporting to CSV
1. Click "Export To CSV" button
2. CSV file downloads automatically

## Project Quality Standards

✅ Clean Architecture
✅ Separation of Concerns
✅ Reusable Components
✅ RESTful API Standards
✅ Proper Error Handling
✅ Input Validation
✅ Environment Configuration
✅ Production-Ready Code
✅ Responsive Design
✅ No Console Logs

## Development

### Run Both Servers Simultaneously

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Build for Production

**Backend:**
```bash
# Backend is ready for deployment as-is
# For platforms like Render or Heroku:
npm start
```

**Frontend:**
```bash
npm run build
npm run preview
```

## Deployment

### Backend Deployment (Render/Heroku)
1. Push code to GitHub
2. Connect to Render/Heroku
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy `dist` folder to Vercel/Netlify

## Error Handling

- Global error middleware catches all errors
- Proper HTTP status codes
- User-friendly error messages
- Validation error details
- Toast notifications for user feedback

## Security Features

✅ CORS enabled
✅ Input validation
✅ Error sanitization
✅ Environment variables
✅ Unique email constraint

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Pagination for large datasets
- Efficient database queries
- Responsive UI with loading states
- Optimized bundle size

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or connection string is correct
- Check MongoDB URI in .env file

### CORS Error
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend .env

### Port Already in Use
- Change PORT in .env file
- Or kill process using the port

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ for Production Ready Applications
│   │   └── utils/
│   ├── server.js
│   ├── app.js
│   ├── package.json
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── routes/AppRoutes.jsx
│   │   ├── pages/
│   │   │   ├── ListPage.jsx
│   │   │   ├── AddEditPage.jsx
│   │   │   └── ViewPage.jsx
│   │   ├── components/
│   │   │   ├── UserForm.jsx
│   │   │   ├── UserTable.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   └── Loader.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── vite.config.js
└── .gitignore
```

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mern-user-management
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Ensure `VITE_API_BASE_URL` is set correctly:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users (with pagination)
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `GET /api/users/search?query=name` - Search users
- `GET /api/users/export/csv` - Export users to CSV

## Usage

1. **List Users**: View all users with pagination and search functionality
2. **Add User**: Fill the form and submit to create a new user
3. **Edit User**: Click edit on any user to modify their details
4. **View Details**: Click view to see full user information
5. **Delete User**: Click delete and confirm to remove a user
6. **Search**: Search users by first name, last name, or email
7. **Export**: Download all users as a CSV file

## Error Handling

The application includes comprehensive error handling:
- Validation errors with detailed messages
- Duplicate email detection
- Database connection errors
- API request errors with toast notifications
- Global error handler middleware

## Production Deployment

### Backend (Render/Heroku)
1. Push to GitHub
2. Connect repository to Render/Heroku
3. Set environment variables in deployment platform
4. Deploy

### Frontend (Vercel/Netlify)
1. Push to GitHub
2. Connect repository to Vercel/Netlify
3. Update `VITE_API_BASE_URL` with your backend URL
4. Deploy

## Technologies Used

- **Runtime**: Node.js v18+
- **Database**: MongoDB
- **Frontend Framework**: React
- **Build Tool**: Vite
- **UI Library**: Material UI
- **HTTP Client**: Axios
- **Data Export**: json2csv

## Author

Full Stack MERN Developer
Prateek Dwivedi
