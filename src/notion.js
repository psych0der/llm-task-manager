const axios = require('axios');

const notionAPI = {
  apiKey: process.env.NOTION_API_KEY,
  baseUrl: 'https://api.notion.com/v1',

  async fetchCurrentTasks() {
    try {
      const response = await axios.get(`${this.baseUrl}/tasks`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.data.tasks;
    } catch (error) {
      console.error('Error fetching tasks from Notion:', error);
      return [];
    }
  },

  async updateTaskProgress(task) {
    try {
      const response = await axios.patch(`${this.baseUrl}/tasks/${task.id}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        data: {
          progress: task.progress
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating task progress in Notion:', error);
      return null;
    }
  },

  async addChecklist(task, checklist) {
    try {
      const response = await axios.post(`${this.baseUrl}/tasks/${task.id}/checklist`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        data: {
          checklist: checklist
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding checklist to task in Notion:', error);
      return null;
    }
  },

  async createTaskAttributes(task) {
    try {
      const response = await axios.post(`${this.baseUrl}/tasks/${task.id}/attributes`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        data: {
          attributes: task.attributes
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating task attributes in Notion:', error);
      return null;
    }
  }
};

module.exports = notionAPI;
