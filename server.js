'use strict'
const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config({ silent: true });
require('./src/models/index')
const port = normalizaPort(process.env.PORT || '80')

/// Inicializa APP
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: 1024 * 1024 * 20, type: 'application/json' }));

//** Imagens */
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'assets')));

// Rota Principal
app.use(require('./src/routes/index'))

app.get('/avatar/:name', function (req, res) {
  const file = req.params.name
  res.sendFile(path.join(__dirname, 'assets/user', file))
});

app.get('/logoexchange/:name', function (req, res) {
  const file = req.params.name
  res.sendFile(path.join(__dirname, 'assets/exchange', file))
});

app.get('/logocoin/:name', function (req, res) {
  const file = req.params.name
  res.sendFile(path.join(__dirname, 'assets/coin', file))
});

// Porta
app.set('port', port);
app.listen(app.get('port'), () => {
  console.log('Desbravador-Back listening on port: ', app.get('port'))
});

// Normaliza a porta
function normalizaPort(val) {
  const porta = parseInt(val, 10)
  if (isNaN(porta)) {
    return val
  }
  if (porta >= 0) {
    return porta
  }
  return false
}