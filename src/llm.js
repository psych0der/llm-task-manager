const axios = require('axios');

const llm = {
  apiKey: process.env.OPENAI_API_KEY,
  baseUrl: 'https://api.openai.com/v1',

  async processContext(context) {
    try {
      const response = await axios.post(`${this.baseUrl}/engines/davinci-codex/completions`, {
        prompt: `Process the following context: ${JSON.stringify(context)}`,
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error processing context with OpenAI:', error);
      return null;
    }
  },

  async generateQuestions(task, context) {
    try {
      const response = await axios.post(`${this.baseUrl}/engines/davinci-codex/completions`, {
        prompt: `Generate questions for the following task: ${JSON.stringify(task)} with context: ${JSON.stringify(context)}`,
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.data.choices[0].text.trim().split('\n');
    } catch (error) {
      console.error('Error generating questions with OpenAI:', error);
      return [];
    }
  },

  async processQuestions(questions) {
    try {
      const response = await axios.post(`${this.baseUrl}/engines/davinci-codex/completions`, {
        prompt: `Process the following questions: ${JSON.stringify(questions)}`,
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error processing questions with OpenAI:', error);
      return null;
    }
  },

  async processContext(context, deepThinkingResult) {
    try {
      const response = await axios.post(`${this.baseUrl}/engines/davinci-codex/completions`, {
        prompt: `Process the following context: ${JSON.stringify(context)} and deep thinking result: ${deepThinkingResult}`,
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error processing context with OpenAI:', error);
      return null;
    }
  }
};

module.exports = llm;
