const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

// Lade .env Datei für lokale Entwicklung
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

// MongoDB Connection
const uri = process.env.MONGODB_URI;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(process.env.MONGODB_DB_NAME || 'fitness_db');
    cachedDb = db;
    console.log('Successfully connected to MongoDB.');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Nach der MongoDB Connection-Funktion
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI ist nicht definiert!');
  process.exit(1);
}

// View engine setup
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Auth middleware
const checkAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = await connectToDatabase();
    // MongoDB syntax for finding a user
    const user = await db.collection('users').findOne({
      $or: [
        { email: username },
        { username: username }
      ]
    });
    
    if (!user) {
      console.log('Login attempt with non-existent username/email:', username);
      return res.render('login', { error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.userId = user._id; // MongoDB uses _id
      console.log('Successful login for user:', user.username);
      res.redirect('/dashboard');
    } else {
      console.log('Failed login attempt for user:', user.username);
      res.render('login', { error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.render('login', { error: 'Database error' });
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await connectToDatabase();
    
    // MongoDB syntax
    await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      username
    });
    
    res.redirect('/login');
  } catch (error) {
    // Check specifically for duplicate key error (email already exists)
    if (error.code === 11000) {
      return res.render('register', { error: 'Email already exists' });
    }
    res.render('register', { error: error.message });
  }
});

app.get('/dashboard', checkAuth, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const fitnessData = await db.collection('fitness_data')
      .find({ user_id: new ObjectId(req.session.userId) })
      .sort({ date: -1 })
      .toArray();
    
    res.render('dashboard', { fitnessData });
  } catch (err) {
    console.error('Database error:', err);
    res.render('dashboard', { error: 'Database error', fitnessData: [] });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/debug/data', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [users, fitnessData, workouts] = await Promise.all([
      db.collection('users').find({}).toArray(),
      db.collection('fitness_data').find({}).toArray(),
      db.collection('workouts').find({}).toArray()
    ]);

    res.json({
      users: users.map(u => ({ ...u, password: undefined })), // Don't expose passwords
      fitness_data: fitnessData,
      workouts: workouts
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/fitness/add', checkAuth, async (req, res) => {
  const { date, steps, calories, distance } = req.body;
  const userId = req.session.userId;
  
  try {
    const db = await connectToDatabase();
    await db.collection('fitness_data').insertOne({
      user_id: new ObjectId(userId),
      date: new Date(date),
      steps: parseInt(steps),
      calories: parseInt(calories),
      distance: parseFloat(distance)
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error adding fitness data:', err);
    res.render('dashboard', { 
      error: 'Error adding fitness data',
      fitnessData: [] 
    });
  }
});

// Nur für Entwicklungszwecke
if (process.env.NODE_ENV !== 'production') {
  app.get('/env-test', (req, res) => {
    res.json({
      mongodb_uri: process.env.MONGODB_URI ? 'Definiert' : 'Nicht definiert',
      node_env: process.env.NODE_ENV,
      db_name: process.env.MONGODB_DB_NAME
    });
  });
}

/*const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/

module.exports = { app };
