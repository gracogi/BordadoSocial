// setup.js no Node.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err.message);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeExibicao TEXT,
      arroba TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS publicacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      descricao TEXT,
      curtidas INTEGER,
      comentarios INTEGER,
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )`);
    console.log('Banco de dados inicializado no backend');
  }
});

module.exports = db;
