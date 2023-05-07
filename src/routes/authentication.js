const { Router } = require('express');
const router = Router();
const helpers = require('../lib/helpers.js');
const pool = require('../controllers/database.js');
const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');

router.get('/', (req, res) => {
  res.render('auth/login');
});

router.post('/', async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  const [rows] = await pool.query('SELECT * FROM usersask WHERE user = ?', [user]);
  try {
    if (typeof (rows) === 'undefined') {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    };
    const isMatch = await helpers.matchPassword(pass, rows.pass);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      id: rows.id,
      user: rows.user,
      name: rows.name,
      last: rows.last
    }, secret);
    const serialized = serialize('myAppToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
      path: '/'
    });
    // res.cookie('myAppCookie', serialized, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'lax',
    //   maxAge: 1000 * 60
    // });
    res.setHeader('Set-Cookie', serialized);
    return res.json({ message: 'Autenticación exitosa' });
  } catch (e) {
    console.log(e);
    res.redirect('/login');
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

router.get('/setcookie', (req, res) => {
  console.log('cookie set');
});

router.post('/setcookie', (req, res) => {
  res.cookie('myAppCookie', 'cookie set', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60
  });
});

router.get('/getcookie', (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

module.exports = router;