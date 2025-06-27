const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err.message);
  } else {
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeExibicao TEXT,
        arroba TEXT
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS publicacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        descricao TEXT,
        curtidas INTEGER,
        comentarios INTEGER,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
      )
    `);
    console.log('Banco de dados inicializado');
  }
});

// Listar publicações
app.get('/publicacoes', (req, res) => {
  db.all(`
    SELECT p.*, u.nomeExibicao, u.arroba 
    FROM publicacoes p 
    JOIN usuarios u ON p.usuario_id = u.id
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Criar nova publicação
app.post('/publicacoes', (req, res) => {
  const { usuario_id, descricao } = req.body;
  db.run(
    `INSERT INTO publicacoes (usuario_id, descricao, curtidas, comentarios) VALUES (?, ?, 0, 0)`,
    [usuario_id, descricao],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

// Rodar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
