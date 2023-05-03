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
    const asks = {};
    for (let i = 0; i < index.length; i++) {
      const j = parseInt(index[i]);
      let [ask] = await pool.query('SELECT * FROM ' + quest + ' WHERE id = ?;', [j]);
      console.log(ask);
      ask = await this.ltex(ask);
      console.log("despues", ask);
      const askid = "q" + (i + 1).toString();
      asks[askid] = ask;
    }
    return asks;
  }
}

module.exports = Questions;