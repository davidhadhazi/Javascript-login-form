const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// In-memory user storage
const users = {};

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (users[email] && users[email] === password) {
    res.send(`<h1>Welcome, ${email}!</h1><a href="/">Go back</a>`);
  } else {
    res.send('<h1>Invalid email or password.</h1><a href="/login">Try again</a>');
  }
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (users[email]) {
    res.send('<h1>Email already registered.</h1><a href="/register">Try again</a>');
  } else {
    users[email] = password;
    res.send('<h1>Registration successful!</h1><a href="/login">Login here</a>');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

