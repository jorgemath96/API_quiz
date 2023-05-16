const { Router } = require('express');
const router = Router();
const pool = require('../controllers/database.js');
const Resume = require('../lib/resume.js');
const resume = new Resume();

router.get('/', async (req, res) => {
  res.json(resume.getResume());
});

router.get('/seleccionar', async (req, res) => {
  const data = await resume.getResume();
  const array = await resume.getSubtopic(data);
  res.render('manage/question/select', { datos: array });
});

router.post('/seleccionar', async (req, res) => {
  const { idt, level } = req.body;
  res.redirect(`/api/quiz/${idt}/${level}`);
});

router.get('/quiz/:idt/:level', async (req, res) => {
  let { idt, level } = req.params;
  idt = parseInt(String(idt) + level)
  const data = await pool.query('SELECT * FROM questions.asks WHERE idt = ?', [idt]);
  res.json(data);
});


module.exports = router;