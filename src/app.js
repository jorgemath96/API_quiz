const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app. use((req, res, next) => {
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