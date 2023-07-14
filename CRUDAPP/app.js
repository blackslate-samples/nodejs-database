// Step 1: Setting up the Environment
const express = require('express');
const app = express();
const port = 3100;
app.use(express.json());

// Step 2: Installing Dependencies
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crud-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Step 5: Defining the Data Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
  age: Number
});
const User = mongoose.model('User', userSchema);

// Step 6: Implementing the CRUD Operations
// Create Operation
app.post('/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save().then(() => {
    res.status(201).json({ message: 'User created successfully' });
  }).catch((error) => {
    res.status(400).json({ error: 'Error creating user' });
  });
});

// Read Operation
app.get('/users', (req, res) => {
  User.find().then((users) => {
    res.json(users);
  }).catch((error) => {
    res.status(500).json({ error: 'Error retrieving users' });
  });
});

// Update Operation
app.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.json({ message: 'User updated successfully' });
  }).catch((error) => {
    res.status(400).json({ error: 'Error updating user' });
  });
});

// Delete Operation
app.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id).then(() => {
    res.json({ message: 'User deleted successfully' });
  }).catch((error) => {
    res.status(400).json({ error: 'Error deleting user' });
  });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
