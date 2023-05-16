const { Router } = require('express');
const router = Router();
const pool = require('../controllers/database.js');
const Resume = require('../lib/resume.js');
const resume = new Resume();
const AQuestion = require('../controllers/admin.questions.js');
const aQuestion = new AQuestion();
const multer = require('multer');
const uploadDir = 'src/uploads';
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

router.get('/question', async (req, res) => {
  const data = await resume.getResume();
  const array = await resume.getSubtopic2(data);
  res.json(array);
});

router.get('/add/question', async (req, res) => {
  const message = req.flash('success');
  const data = await resume.getResume();
  const array = await aQuestion.getSubtopic(data);
  res.render('manage/question/add', { datos: array, mensaje: [message, 'success'] });
});

router.post('/add/question', async (req, res) => {
  let { s, t, st, level, ask, r1, r2, r3, r4 } = req.body;
  let idt = await aQuestion.getIdt(s, t, st);
  idt = parseInt(String(idt) + level)
  let newQuestion = [idt, ask, r1, r2, r3, r4];
  try {
    await pool.query('INSERT INTO questions.asks SET idt = ?, ask = ?, r1 = ?, r2 = ?, r3 = ?, r4 = ?', newQuestion);
    req.flash('success', 'Pregunta agregada con éxito');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Error al agregar pregunta');
  }
  res.redirect('/admin/add/question');
});

router.get('/upload', (req, res) => {
  res.render('manage/upload/upload');
});

router.post('/upload', upload.single('file'), (req, res, next) => {
  res.send('Archivo subido con éxito');
});

router.get('/upload/', async (req, res) => {});

// router.get('/', (req, res) => {
//   res.render('proof/proof')
// });

// router.post('/', (req, res, next) => {
//   res.send('Archivo subido con éxito');
// });

module.exports = router;