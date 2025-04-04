
# WealthCompass Backend

This is the Flask backend for the WealthCompass wealth management platform.

## Setup Instructions

1. Install Python 3.8 or higher if not already installed

2. Create a virtual environment:
```
python -m venv venv
```

3. Activate the virtual environment:
- On Windows:
```
venv\Scripts\activate
```
- On macOS/Linux:
```
source venv/bin/activate
```

4. Install dependencies:
```
pip install -r requirements.txt
```

5. Run the Flask server:
```
python app.py
```

The server will start on http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/login - Login with username and password
- POST /api/auth/register - Register a new user

### Portfolios
- GET /api/portfolios/<user_id> - Get a user's portfolio data

### Marketplace
- GET /api/marketplace - Get all marketplace listings
- POST /api/marketplace - Create a new marketplace listing
- DELETE /api/marketplace/<item_id> - Delete a marketplace listing

### Messages
- GET /api/messages/<user_id> - Get a user's notifications/messages

## Database

The application uses SQLite for data storage, with the database file `wealth_compass.db` created automatically on first run.
