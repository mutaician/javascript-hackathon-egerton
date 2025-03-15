# Local Business Finder and Review Platform

This project is a full-stack JavaScript application that allows users to discover local businesses, view their details, and leave reviews. The application consists of a Node.js/Express backend with MongoDB and a React/TypeScript frontend.

## Features

- Browse and search for local businesses
- Filter businesses by location and category
- View detailed business profiles
- Add new businesses with location data
- Leave reviews with ratings for businesses
- Location-based filtering using geospatial coordinates

## Prerequisites

- Node.js (v18+)
- MongoDB (v6+)
- PNPM package manager

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/            # API service functions
│   │   ├── assets/         # Static assets
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
├── server/                 # Backend Express application
│   ├── controllers/        # Request handlers
│   │   ├── businessController.js
│   │   └── reviewController.js
│   ├── models/             # MongoDB models
│   │   ├── Business.js
│   │   └── Review.js       # Rating (1-5), comment, businessId reference
│   ├── routes/             # API route definitions
│   ├── scripts/            # Utility scripts
│   └── tests/              # Tests for the API
```

## Installation

### Clone the repository

```bash
git clone https://github.com/mutaician/javascript-hackathon-egerton.git
cd local-business-finder
```

### Backend Setup

```bash
cd server
pnpm install
```

Create a `.env` file in the `server` directory with the following content:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/local-business-finder
```

### Frontend Setup

```bash
cd ../client
pnpm install
```

## Running the Application

### Start the Backend Server

```bash
cd server
pnpm start
```

The server will run on http://localhost:5000

### Start the Frontend Development Server

```bash
cd client
pnpm dev
```

The frontend will be available at http://localhost:5173

## API Endpoints

### Businesses

- `GET /api/businesses` - Get all businesses
- `GET /api/businesses/:id` - Get a specific business
- `POST /api/businesses` - Create a new business
- `PUT /api/businesses/:id` - Update a business
- `DELETE /api/businesses/:id` - Delete a business

### Reviews

- `POST /api/reviews` - Create a new review
- `GET /api/reviews/business/:businessId` - Get all reviews for a business
- `GET /api/reviews/:id` - Get a specific review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

## Technology Stack

### Frontend
- React 19 with TypeScript
- Vite as the build tool
- React Router DOM for routing
- Axios for API requests
- TailwindCSS for styling

### Backend
- Node.js and Express.js
- MongoDB with Mongoose
- Node-geocoder for location services
- CORS for cross-origin resource sharing
- dotenv for environment variable management

## Location-Based Features

The application supports geolocation features:

1. Businesses can be created with coordinate data
2. Users can search for businesses near their current location
3. Results can be filtered by distance

## Development Guidelines

1. **Code Style**: Follow the existing code style and ESLint configurations.
2. **Component Structure**: Use TypeScript interfaces for component props.
3. **API Requests**: Use the existing API utility functions in the client.
4. **Error Handling**: Implement proper error handling for all API calls.
5. **MongoDB Models**: Follow the established schema patterns for any new models.
6. **Environment Variables**: Don't commit sensitive information; use environment variables.
7. **Testing**: Write tests for new features using the testing setup.



## License

This project is licensed under the MIT License.