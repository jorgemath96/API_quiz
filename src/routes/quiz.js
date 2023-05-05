const { Router } = require('express');
const router = Router();
const pool = require('../controllers/database.js');

router.get('/:quiz', async (req, res) => {
    const { quiz } = req.params;
    const questions = await pool.query('SELECT * FROM ' + quiz);
    res.render('quest/quiz', { quiz: questions }); 
});

module.exports = router;