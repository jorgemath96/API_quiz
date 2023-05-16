const Resume = require('../lib/resume.js');
const resume = new Resume();

class AQuestion {
  constructor() { }

  async getSubtopic(data) {
    let idt;
    let array = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].topic.length; j++) {
        for (let sub in data[i].topic[j].subtopic) {
          idt = await resume.defineIdt(i + 1, j + 1, sub);
          array.push({ 'idt': idt, 'st': data[i].topic[j].subtopic[sub] });
        }
      }
    }
    return array;
  }
}

module.exports = AQuestion;