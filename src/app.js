const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
// const flash = require('connect-flash');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { isAuthenticated } = require('./lib/helpers.js');
const cookieParser = require('cookie-parser');

// Motor de vistas hbs
const exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials')
}));
app.set('view engine', '.hbs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use((req, res, next) => {
  
  next();
});
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
  preflightContinue: false,
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(flash());



// Variables Globales
app.use((req, res, next) => {
  // app.locals.success = req.flash('success', 'El elemento fue eliminado');
  // app.locals.message = req.flash('message', 'El usuario o la contraseña son incorrectos');
  app.locals.user = req.user;
  next();
});
// Rutas
app.use('/login', require('./routes/authentication.js'));
app.use('/api', require('./routes/questions.js'));
app.use('/admin', require('./routes/add-question.js'));
app.use('/list', require('./routes/quiz.js'));
// app.use('/', (req, res) => {
//     res.redirect('/api/questions');
// });

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});