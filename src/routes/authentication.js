const { Router } = require('express');
const router = Router();
const helpers = require('../lib/helpers.js');
const pool = require('../controllers/database.js');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(authHeader);
  if (token == null) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};


router.get('/', (req, res) => {
  res.render('auth/login');
});

router.post('/', async (req, res) => {
  const duser = process.env.DB_NAME + '.users';
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body)
  const [rows] = await pool.query('SELECT * FROM ' + duser + ' WHERE username = ?', [username]);
  try {
    console.log(rows);
    if (typeof (rows) === 'undefined') {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    };
    // const isMatch = await helpers.matchPassword(password, rows.password);
    console.log("este es el password: ", password);
    if (password !== rows.password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
      { id: rows.id, username: rows.username },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    console.log("Este es el jwt", token);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 3600,
      sameSite: 'none',
    }
    const cookieHeader = `jwt=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`
    res.header('auth-token', token);
    res.setHeader('Set-Cookie', cookieHeader);
    const user = { id: rows.id, username: rows.username, fname: rows.fname, lname: rows.lname };
    return res.json({ message: 'Bienvenido', user: { id: user.id, user: user.username, name: user.name, last: user.last } });
  } catch (e) {
    console.log(e);
    res.json({ message: 'Error' });
  }
});

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
  const { username, password, fname, lname } = req.body;
  const { school, grade, group, cicle } = req.body;
  const dusers = process.env.DB_NAME + '.users';

  const [rows] = await pool.query('SELECT username FROM ' + dusers + ' WHERE username = ?', [username]);

  if (typeof (rows) === 'undefined') {
    const newUser = {
      username,
      password,
      school
    };
    newUser.password = await helpers.encryptPassword(password);
    await pool.query('INSERT INTO ' + dusers + ' SET ?', [newUser]);
    const [user] = await pool.query('SELECT id FROM ' + dusers + ' WHERE username = ?', [username]);
    const schuser = await helpers.schoolSel(user.id, school, fname, lname, grade, group, cicle);
    await pool.query('INSERT INTO ' + schuser[0] + ' SET ?', [schuser[1]]);
    res.send('usuario creado');
  } else {
    let error = 'El usuario ya existe';
    console.log(error);
    res.render('auth/signup', { message: [error, 'danger'] });
  }
});

module.exports = router;




// console.log("este es el user", user)
//     const header = { alg: 'HS256', typ: 'JWT' };
//     const secretKey = process.env.SECRET_KEY;
//     const token = jwt.sign({ user }, secretKey, { header });
//     const cookieOptions = {
//       httpOnly: true,
//       secure: true,
//       maxAge: 3600,
//       sameSite: 'none',
//     }
//     const cookieHeader = `jwt=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`
//     res.setHeader('Set-Cookie', cookieHeader);
//     res.cookie('jwt', token, cookieOptions);