const { Router } = require('express');
const router = Router();
const pool = require('../controllers/database.js');
const Resume = require('../lib/resume.js');
const resume = new Resume();

router.get('/', async (req, res) => {
  res.json(resume.getResume());
});


module.exports = router;