const fs = require('fs');
const path = require('path');
const llm = require('./llm');

const contextFilePath = path.join(__dirname, 'context.json');

const contextManager = {
  async getContext(taskId) {
    try {
      const contextData = await fs.promises.readFile(contextFilePath, 'utf-8');
      const context = JSON.parse(contextData);
      return context[taskId] || {};
    } catch (error) {
      console.error('Error reading context file:', error);
      return {};
    }
  },

  async updateContext(taskId, newContext) {
    try {
      const contextData = await fs.promises.readFile(contextFilePath, 'utf-8');
      const context = JSON.parse(contextData);
      context[taskId] = newContext;
      await fs.promises.writeFile(contextFilePath, JSON.stringify(context, null, 2), 'utf-8');
      console.log('Context updated successfully.');
    } catch (error) {
      console.error('Error updating context file:', error);
    }
  },

  async storeContext(task) {
    try {
      const context = await this.getContext(task.id);
      const updatedContext = { ...context, ...task };
      await this.updateContext(task.id, updatedContext);
      console.log('Context stored successfully.');
    } catch (error) {
      console.error('Error storing context:', error);
    }
  },

  async retrieveContext(taskId) {
    try {
      const context = await this.getContext(taskId);
      console.log('Context retrieved successfully.');
      return context;
    } catch (error) {
      console.error('Error retrieving context:', error);
      return {};
    }
  },

  async manageContextWithLLM(task) {
    try {
      const context = await this.getContext(task.id);
      const llmContext = await llm.processContext(context);
      await this.updateContext(task.id, llmContext);
      console.log('Context managed with LLM successfully.');
    } catch (error) {
      console.error('Error managing context with LLM:', error);
    }
  }
};

module.exports = contextManager;
