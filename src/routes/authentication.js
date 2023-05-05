const { Router } = require('express');
const router = Router();
const helpers = require('../lib/helpers.js');
const pool = require('../controllers/database.js');

router.get('/', (req, res) => {
  res.render('auth/login');
});

router.post('/', async (req, res) => {
  const { user, pass } = req.body;
  const [validPass] = await pool.query('SELECT * FROM usersask WHERE user = ?', [user]);
  console.log(validPass.pass);
  if (validPass.pass.length > 0) {
    if (await helpers.matchPassword(pass, validPass.pass)) {
      return res.send(validPass);
    } else {
      return res.redirect('/login');
    }
  } else {
    return res.redirect('/login');
  }
});

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
  const { user, pass, name, last } = req.body;
  const rows = await pool.query('SELECT user FROM usersask WHERE user = ?', [user]);
  console.log(rows.length);
  if (rows.length === 'undefined' || rows.length === 0) {
    const newUser = {
      user,
      pass,
      name,
      last
    };
    console.log(newUser);
    newUser.pass = await helpers.encryptPassword(pass);
    await pool.query('INSERT INTO usersask SET ?', [newUser]);
    res.send('usuario creado');
  } else {
    let error = 'El usuario ya existe';
    console.log(error);
    res.render('auth/signup', { message: [error, 'danger'] });
  }
});

module.exports = router;