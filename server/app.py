
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import json
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Database setup
DB_PATH = 'wealth_compass.db'

def init_db():
    """Initialize the SQLite database with required tables"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT UNIQUE,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Client details table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS client_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        first_name TEXT,
        last_name TEXT,
        date_of_birth DATE,
        phone TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        country TEXT,
        zip_code TEXT,
        tax_id TEXT,
        risk_tolerance TEXT,
        investment_horizon TEXT,
        investment_goals TEXT,
        annual_income REAL,
        net_worth REAL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Portfolios table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS portfolios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        total_value REAL NOT NULL,
        initial_investment REAL NOT NULL,
        currency TEXT DEFAULT 'USD',
        risk_score REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Assets table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        portfolio_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        ticker TEXT,
        type TEXT NOT NULL,
        quantity REAL NOT NULL,
        purchase_price REAL NOT NULL,
        current_price REAL NOT NULL,
        purchase_date TIMESTAMP,
        currency TEXT DEFAULT 'USD',
        FOREIGN KEY (portfolio_id) REFERENCES portfolios (id)
    )
    ''')
    
    # Performance history table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS performance_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        portfolio_id INTEGER NOT NULL,
        date TIMESTAMP NOT NULL,
        value REAL NOT NULL,
        FOREIGN KEY (portfolio_id) REFERENCES portfolios (id)
    )
    ''')
    
    # Marketplace listings table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS marketplace_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        type TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        listed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Messages/notifications table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        priority TEXT DEFAULT 'medium',
        read BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Create mock users if they don't exist
    cursor.execute("SELECT * FROM users WHERE username='muser'")
    if not cursor.fetchone():
        cursor.execute(
            "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)",
            ('muser', generate_password_hash('muser'), 'user')
        )
    
    cursor.execute("SELECT * FROM users WHERE username='mvc'")
    if not cursor.fetchone():
        cursor.execute(
            "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)",
            ('mvc', generate_password_hash('mvc'), 'admin')
        )
    
    conn.commit()
    conn.close()

# Initialize the database
init_db()

# API Routes
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, password_hash, role FROM users WHERE username=?", (username,))
    user = cursor.fetchone()
    conn.close()
    
    if user and check_password_hash(user[2], password):
        return jsonify({
            'id': user[0],
            'username': user[1],
            'role': user[3]
        }), 200
    
    return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        # Check if username already exists
        cursor.execute("SELECT id FROM users WHERE username=?", (username,))
        if cursor.fetchone():
            conn.close()
            return jsonify({'error': 'Username already exists'}), 409
        
        # Create new user
        password_hash = generate_password_hash(password)
        cursor.execute(
            "INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)",
            (username, password_hash, email, 'user')
        )
        user_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            'id': user_id,
            'username': username,
            'message': 'User registered successfully'
        }), 201
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/client/profile', methods=['GET', 'POST'])
def client_profile():
    data = request.get_json() if request.method == 'POST' else {}
    user_id = request.args.get('user_id') or data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    if request.method == 'GET':
        # Get client profile
        cursor.execute("SELECT * FROM client_details WHERE user_id=?", (user_id,))
        profile = cursor.fetchone()
        conn.close()
        
        if not profile:
            return jsonify({'error': 'Profile not found', 'user_id': user_id}), 404
        
        return jsonify(dict(profile)), 200
    
    elif request.method == 'POST':
        # Create or update client profile
        required_fields = ['first_name', 'last_name']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if profile exists
        cursor.execute("SELECT id FROM client_details WHERE user_id=?", (user_id,))
        profile = cursor.fetchone()
        
        fields = [
            'first_name', 'last_name', 'date_of_birth', 'phone', 'address',
            'city', 'state', 'country', 'zip_code', 'tax_id', 'risk_tolerance',
            'investment_horizon', 'investment_goals', 'annual_income', 'net_worth'
        ]
        
        if profile:
            # Update existing profile
            set_clause = ", ".join([f"{field}=?" for field in fields if field in data])
            set_clause += ", updated_at=CURRENT_TIMESTAMP"
            values = [data.get(field) for field in fields if field in data]
            values.append(user_id)
            
            cursor.execute(f"UPDATE client_details SET {set_clause} WHERE user_id=?", values)
        else:
            # Create new profile
            available_fields = [field for field in fields if field in data]
            placeholders = ", ".join(["?"] * (len(available_fields) + 1))
            columns = ", ".join(["user_id"] + available_fields)
            values = [user_id] + [data.get(field) for field in available_fields]
            
            cursor.execute(f"INSERT INTO client_details ({columns}) VALUES ({placeholders})", values)
        
        conn.commit()
        
        # Fetch the updated profile
        cursor.execute("SELECT * FROM client_details WHERE user_id=?", (user_id,))
        updated_profile = cursor.fetchone()
        conn.close()
        
        return jsonify(dict(updated_profile)), 200

@app.route('/api/portfolios', methods=['POST'])
def create_portfolio():
    data = request.get_json()
    user_id = data.get('user_id')
    name = data.get('name')
    initial_investment = data.get('initial_investment')
    currency = data.get('currency', 'USD')
    
    if not all([user_id, name, initial_investment]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
        INSERT INTO portfolios 
        (user_id, name, total_value, initial_investment, currency)
        VALUES (?, ?, ?, ?, ?)
        ''', (user_id, name, initial_investment, initial_investment, currency))
        
        portfolio_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            'id': portfolio_id,
            'message': 'Portfolio created successfully'
        }), 201
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/portfolios/<int:user_id>', methods=['GET'])
def get_user_portfolio(user_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get the portfolio
    cursor.execute('''
    SELECT * FROM portfolios WHERE user_id=?
    ''', (user_id,))
    portfolio = cursor.fetchone()
    
    if not portfolio:
        conn.close()
        return jsonify({'error': 'Portfolio not found'}), 404
    
    portfolio_dict = dict(portfolio)
    portfolio_id = portfolio_dict['id']
    
    # Get the assets
    cursor.execute('''
    SELECT * FROM assets WHERE portfolio_id=?
    ''', (portfolio_id,))
    assets = [dict(row) for row in cursor.fetchall()]
    
    # Get performance history
    cursor.execute('''
    SELECT date, value FROM performance_history 
    WHERE portfolio_id=? ORDER BY date
    ''', (portfolio_id,))
    performance_data = [dict(row) for row in cursor.fetchall()]
    
    # Calculate asset allocation
    asset_allocation = {}
    for asset in assets:
        asset_type = asset['type']
        value = asset['quantity'] * asset['current_price']
        if asset_type in asset_allocation:
            asset_allocation[asset_type] += value
        else:
            asset_allocation[asset_type] = value
    
    # Convert to percentages
    total_value = portfolio_dict['total_value']
    for asset_type in asset_allocation:
        asset_allocation[asset_type] = (asset_allocation[asset_type] / total_value) * 100
    
    # Add calculated values to each asset
    for asset in assets:
        asset['value'] = asset['quantity'] * asset['current_price']
        asset['allocation'] = (asset['value'] / total_value) * 100
    
    # Compose the full portfolio response
    portfolio_dict['assets'] = assets
    portfolio_dict['performanceData'] = performance_data
    portfolio_dict['assetAllocation'] = asset_allocation
    
    conn.close()
    return jsonify(portfolio_dict), 200

@app.route('/api/portfolios/<int:portfolio_id>/assets', methods=['POST'])
def add_asset_to_portfolio(portfolio_id):
    data = request.get_json()
    required_fields = ['name', 'type', 'quantity', 'purchase_price', 'current_price']
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        # Check if portfolio exists
        cursor.execute("SELECT id, total_value FROM portfolios WHERE id=?", (portfolio_id,))
        portfolio = cursor.fetchone()
        
        if not portfolio:
            conn.close()
            return jsonify({'error': 'Portfolio not found'}), 404
        
        # Add asset
        cursor.execute('''
        INSERT INTO assets 
        (portfolio_id, name, ticker, type, quantity, purchase_price, current_price, purchase_date, currency)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            portfolio_id, 
            data.get('name'), 
            data.get('ticker'),
            data.get('type'),
            data.get('quantity'),
            data.get('purchase_price'),
            data.get('current_price'),
            data.get('purchase_date', datetime.datetime.now().isoformat()),
            data.get('currency', 'USD')
        ))
        
        asset_id = cursor.lastrowid
        
        # Update portfolio total value
        new_asset_value = data.get('quantity') * data.get('current_price')
        new_total_value = portfolio[1] + new_asset_value
        
        cursor.execute('''
        UPDATE portfolios 
        SET total_value = ?, last_updated = CURRENT_TIMESTAMP
        WHERE id = ?
        ''', (new_total_value, portfolio_id))
        
        # Add to performance history
        cursor.execute('''
        INSERT INTO performance_history (portfolio_id, date, value)
        VALUES (?, ?, ?)
        ''', (portfolio_id, datetime.datetime.now().isoformat(), new_total_value))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'id': asset_id,
            'message': 'Asset added successfully',
            'total_value': new_total_value
        }), 201
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/marketplace', methods=['GET'])
def get_marketplace_items():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''
    SELECT m.*, u.username as seller_username
    FROM marketplace_items m
    JOIN users u ON m.user_id = u.id
    WHERE m.status = 'active'
    ORDER BY m.listed_date DESC
    ''')
    
    items = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return jsonify(items), 200

@app.route('/api/marketplace', methods=['POST'])
def create_marketplace_item():
    data = request.get_json()
    user_id = data.get('user_id')
    title = data.get('title')
    description = data.get('description')
    price = data.get('price')
    item_type = data.get('type')
    
    if not all([user_id, title, price, item_type]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
        INSERT INTO marketplace_items 
        (user_id, title, description, price, type)
        VALUES (?, ?, ?, ?, ?)
        ''', (user_id, title, description, price, item_type))
        
        item_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            'id': item_id,
            'message': 'Item created successfully'
        }), 201
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/marketplace/<int:item_id>', methods=['DELETE'])
def delete_marketplace_item(item_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
        DELETE FROM marketplace_items WHERE id=?
        ''', (item_id,))
        
        if cursor.rowcount == 0:
            conn.close()
            return jsonify({'error': 'Item not found'}), 404
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'Item deleted successfully'
        }), 200
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/messages/<int:user_id>', methods=['GET'])
def get_user_messages(user_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''
    SELECT * FROM messages
    WHERE user_id=?
    ORDER BY created_at DESC
    ''', (user_id,))
    
    messages = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return jsonify(messages), 200

@app.route('/api/admin/users', methods=['GET'])
def get_all_users():
    # Only admin users should have access to this endpoint
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''
    SELECT id, username, email, role, created_at FROM users
    ORDER BY created_at DESC
    ''')
    
    users = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return jsonify(users), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
