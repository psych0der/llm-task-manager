const readline = require('readline');
const llm = require('./llm');

const questionnaire = {
  rl: readline.createInterface({
    input: process.stdin,
    output: process.stdout
  }),

  async generateQuestions(task, context) {
    // Implement logic to generate questions based on the task and context
    // This is a placeholder implementation
    return [
      'What is the main goal of this task?',
      'Are there any specific requirements or constraints?'
    ];
  },

  async getAnswers(questions) {
    const answers = {};
    for (const question of questions) {
      answers[question] = await this.askQuestion(question);
    }
    return answers;
  },

  askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(`${question}\n`, (answer) => {
        resolve(answer);
      });
    });
  },

  close() {
    this.rl.close();
  },

  async generateQuestionsWithLLM(task, context) {
    try {
      const questions = await llm.generateQuestions(task, context);
      return questions;
    } catch (error) {
      console.error('Error generating questions with LLM:', error);
      return [];
    }
  },

  async processQuestionsWithLLM(questions) {
    try {
      const answers = await llm.processQuestions(questions);
      return answers;
    } catch (error) {
      console.error('Error processing questions with LLM:', error);
      return {};
    }
  }
};

module.exports = questionnaire;
