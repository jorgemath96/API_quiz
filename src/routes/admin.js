const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('proof/proof')
});

router.post('/', (req, res, next) => {
  res.send('Archivo subido con éxito');
});