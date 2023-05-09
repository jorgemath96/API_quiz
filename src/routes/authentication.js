const { Router } = require('express');
const router = Router();
const helpers = require('../lib/helpers.js');
const pool = require('../controllers/database.js');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.render('auth/login');
});

router.post('/', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body)
  const [rows] = await pool.query('SELECT * FROM usersask WHERE username = ?', [username]);
  try {
    if (typeof (rows) === 'undefined') {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    };
    const isMatch = await helpers.matchPassword(password, rows.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const user = { id: rows.id, username: rows.username, fname: rows.fname, lname: rows.lname};
    console.log("este es el user", user)
    const header = { alg: 'HS256', typ: 'JWT' };
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ user }, secretKey, { header });
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      maxAge: 3600,
      sameSite: 'none',
    }
    const cookieHeader = `jwt=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`
    res.setHeader('Set-Cookie', cookieHeader);
    return res.json({ message: 'Bienvenido', user: { id: rows.id, user: rows.username, name: rows.name, last: rows.last } });
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

router.get('/profile', (req, res) => {
  console.log(req.body);
  res.json({ message: 'profile' });
});


module.exports = router;