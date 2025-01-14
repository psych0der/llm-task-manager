const axios = require('axios');
const llm = require('./llm');

const researchModule = {
  async gatherContext(task) {
    try {
      const response = await axios.get(`https://api.perplexity.ai/v1/search`, {
        params: {
          query: task.description
        },
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error gathering context from Perplexity:', error);
      return null;
    }
  },

  async deepThink(task) {
    // Implement deep thinking logic here
    // This is a placeholder implementation
    return `Deep thinking result for task: ${task.description}`;
  },

  async getAdditionalContext(questions, answers) {
    try {
      const context = await llm.processQuestions(questions, answers);
      return context;
    } catch (error) {
      console.error('Error getting additional context with LLM:', error);
      return null;
    }
  },

  async gatherAndProcessResearch(task) {
    try {
      const context = await this.gatherContext(task);
      const deepThinkingResult = await this.deepThink(task);
      const llmContext = await llm.processContext(context, deepThinkingResult);
      return llmContext;
    } catch (error) {
      console.error('Error gathering and processing research:', error);
      return null;
    }
  }
};

module.exports = researchModule;
