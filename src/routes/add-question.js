const { Router } = require('express');
const router = Router();
const AddQuestion = require('../controllers/question-add.js');
const add = new AddQuestion();

router.get('/add', (req, res) => {
  res.render('quest/add', { quests: ['quiz1'] });
});

router.post('/add', async (req, res) => {
  let { ask, expression, r1, r2, r3, r4 } = req.body;
  let quiz = 'quiz1';
  let question = await add.add(quiz, ask, expression, r1, r2, r3, r4);
  res.json(question);
});

module.exports = router;