const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ── DB CONNECTION ──────────────────────────────
const db = mysql.createConnection({
  host:     'localhost',
  user:     'root',        // your MySQL username
  password: 'sraya2306',            // your MySQL password
  database: 'crimes_db'   // your database name
});

db.connect(err => {
  if (err) { console.error('DB connection failed:', err); return; }
  console.log('Connected to MySQL');
});

// Create table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS crimes (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    crime_type  VARCHAR(50) NOT NULL,
    location    VARCHAR(100) NOT NULL,
    date        DATE NOT NULL,
    time        TIME,
    severity    ENUM('Low','Medium','High','Critical') DEFAULT 'Medium',
    status      ENUM('Open','Under Investigation','Resolved') DEFAULT 'Open',
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, err => { if (err) console.error(err); });

// ── ROUTES ─────────────────────────────────────

// GET all crimes
app.get('/crimes', (req, res) => {
  db.query('SELECT * FROM crimes ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST add crime
app.post('/addcrime', (req, res) => {
  const { crime_type, location, date, time, severity, status, description } = req.body;
  if (!crime_type || !location || !date)
    return res.status(400).json({ error: 'crime_type, location and date are required' });

  db.query(
    'INSERT INTO crimes (crime_type, location, date, time, severity, status, description) VALUES (?,?,?,?,?,?,?)',
    [crime_type, location, date, time||null, severity, status, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: result.insertId });
    }
  );
});

// PUT update crime
app.put('/crimes/:id', (req, res) => {
  const { crime_type, location, date, time, severity, status, description } = req.body;
  db.query(
    'UPDATE crimes SET crime_type=?, location=?, date=?, time=?, severity=?, status=?, description=? WHERE id=?',
    [crime_type, location, date, time||null, severity, status, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// DELETE crime
app.delete('/crimes/:id', (req, res) => {
  db.query('DELETE FROM crimes WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ── START ──────────────────────────────────────
app.listen(5000, () => console.log('Server running on http://localhost:5000'));