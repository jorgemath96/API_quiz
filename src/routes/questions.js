const { Router } = require('express');
const router = Router();
const Questions = require('../controllers/questions-gen');
const questions = new Questions();

router.get('/questions', async (req, res) => {
  const n = 10;
  const quest = 'quest1';
  const index = await questions.genindex(n);
  console.log(index);
  const asks = await questions.genasks(index, quest);
  res.json(asks);
});

module.exports = router;