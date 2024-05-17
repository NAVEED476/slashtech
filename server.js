const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'movie_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});


app.post('/api/favorites', (req, res) => {
  const { jokeId, jokeText, jokeImageUrl } = req.body;
  const sql = 'INSERT INTO favorites (joke_id, joke_text, joke_image_url) VALUES (?, ?, ?)';
  db.query(sql, [jokeId, jokeText, jokeImageUrl], (err, result) => {
    if (err) throw err;
    res.send('Joke favorited successfully!');
  });
});

app.get('/api/favorites', (req, res) => {
  const sql = 'SELECT * FROM favorites';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});