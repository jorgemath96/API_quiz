const pool = require('./database.js');

class Questions {
  constructor() { }

  randnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async ltex(ask) {
    for (let data in ask) {
      if (data !== 'id' && data !== 'ask') {
        if (ask[data][0] === 's') {
          ask[data] = ask[data].slice(2);
        } else {
          ask[data] = '$$' + ask[data] + '$$';
        }
      }
    }
    return ask;
  }

  genindex(n) {
    let index = new Set();
    while (index.size < n) {
      index.add(this.randnum(0, 16));
    }
    index = Array.from(index);
    return index;
  }

  async genasks(index, quest) {
    const asks = [];
    for (let i = 0; i < index.length; i++) {
      const j = parseInt(index[i]);
      let [ask] = await pool.query('SELECT * FROM ' + quest + ' WHERE id = ?;', [j]);
      ask = await this.ltex(ask);
      await asks.push(ask);
    }
    return {"quiz": asks};
  }
}

module.exports = Questions;