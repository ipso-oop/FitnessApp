const express = require('express');
const serverless = require('serverless-http');
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

app.use(express.json());

// Health check route
app.get('/api', (req, res) => {
  res.json({ message: 'API is running', environment: process.env.NODE_ENV });
});

// User routes
app.get('/api/users', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fitness data routes
app.get('/api/users/:userId/fitness', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const fitnessData = await db.collection('fitness_data')
      .find({ user_id: new ObjectId(req.params.userId) })
      .toArray();
    res.json(fitnessData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Workout routes
app.get('/api/fitness/:fitnessId/workouts', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const workouts = await db.collection('workouts')
      .find({ fitness_data_id: new ObjectId(req.params.fitnessId) })
      .toArray();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

module.exports.handler = serverless(app); 