const axios = require('axios');

const calendarAPI = {
  apiKey: process.env.CALENDAR_API_KEY,
  baseUrl: 'https://www.googleapis.com/calendar/v3',

  async fetchCurrentTasks() {
    try {
      const response = await axios.get(`${this.baseUrl}/calendars/primary/events`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.data.items.map(event => ({
        id: event.id,
        summary: event.summary,
        description: event.description,
        start: event.start.dateTime,
        end: event.end.dateTime
      }));
    } catch (error) {
      console.error('Error fetching tasks from Google Calendar:', error);
      return [];
    }
  }
};

module.exports = calendarAPI;
