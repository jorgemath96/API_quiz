const pool = require('./database.js');

class AddQuestion {
  constructor() {}

  async add(quiz, ask, expression, r1, r2, r3, r4) {
    const newQuestion = {
      ask,
      expression,
      r1,
      r2,
      r3,
      r4
    };
    await pool.query('INSERT INTO ' + quiz + ' SET ?', [newQuestion]);
  }
}

module.exports = AddQuestion;