const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

// MongoDB Connection
const uri = process.env.MONGODB_URI;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(process.env.MONGODB_DB_NAME || 'fitness_db');
    cachedDb = db;
    console.log('Successfully connected to MongoDB.');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// View engine setup
app.set('views', path.join(__dirname, 'views'));
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
  const db=connectToDatabase();
  db.get('SELECT * FROM users WHERE email = ? OR username = ?', [username, username], async (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.render('login', { error: 'Database error' });
    }
    
    if (!user) {
      console.log('Login attempt with non-existent username/email:', username);
      return res.render('login', { error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.userId = user.id;
      console.log('Successful login for user:', user.username);
      res.redirect('/dashboard');
    } else {
      console.log('Failed login attempt for user:', user.username);
      res.render('login', { error: 'Invalid credentials' });
    }
  });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const db=connectToDatabase();
    db.run('INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
      [email, hashedPassword, username],
      (err) => {
        if (err) {
          return res.render('register', { error: 'Email already exists' });
        }
        res.redirect('/login');
      }
    );
  } catch (error) {
    res.render('register', { error: error.message });
  }
});

app.get('/dashboard', checkAuth, (req, res) => {
  const db=connectToDatabase();
  db.all(
    `SELECT * FROM fitness_data WHERE user_id = ? ORDER BY date DESC`,
    [req.session.userId],
    (err, fitnessData) => {
      if (err) {
        return res.render('dashboard', { error: 'Database error', fitnessData: [] });
      }
      res.render('dashboard', { fitnessData });
    }
  );
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/debug/data', async (req, res) => {
  const db=connectToDatabase();
  db.serialize(() => {
    db.all('SELECT * FROM users', [], (err, users) => {
      db.all('SELECT * FROM fitness_data', [], (err, fitness) => {
        db.all('SELECT * FROM workouts', [], (err, workouts) => {
          res.json({
            users: users.map(u => ({ ...u, password: undefined })), // Don't expose passwords
            fitness_data: fitness,
            workouts: workouts
          });
        });
      });
    });
  });
});

app.post('/fitness/add', checkAuth, (req, res) => {
  const { date, steps, calories, distance } = req.body;
  const userId = req.session.userId;
  const db=connectToDatabase();
  db.run(
    `INSERT INTO fitness_data (user_id, date, steps, calories, distance) 
     VALUES (?, ?, ?, ?, ?)`,
    [userId, date, parseInt(steps), parseInt(calories), parseFloat(distance)],
    function(err) {
      if (err) {
        console.error('Error adding fitness data:', err);
        return res.render('dashboard', { 
          error: 'Error adding fitness data',
          fitnessData: [] 
        });
      }

      // Redirect back to dashboard to see updated data
      res.redirect('/dashboard');
    }
  );
});

/*const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/

module.exports = app;
