const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const playersRoute = require('./routes/players');
app.use('/players', playersRoute);

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
