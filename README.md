# LLM Based Task Management Application

## Project Description

This project is an LLM (Large Language Model) based application that integrates with your calendar and Notion to manage your tasks. It can fetch your current tasks from the calendar or Notion, track your progress using Notion subtasks or other notes, and suggest next steps. The application can also add checklists to Notion directly. Every time you finish a subtask, it will think again, suggest the next steps, or conclude the task.

Additionally, for every new task, the application will think deeply and suggest a task breakdown and outline recursively so that the task is distributed nicely into subtasks that are atomic and exhaustive. It can do so in chunks, first suggesting top-level subtasks and then further breaking down each subtask. On every subtask completion, it will think again and continue the process. The application maintains complete context of the work done and can ask you questions that it thinks will be important in planning. It won't start planning unless it has all the answers from you. For questions, it will think deeply and has access to a research module that can gather additional context from the web. The research module is very competent and can use existing services like Perplexity if they offer an API, otherwise, it will implement it from scratch.

## Usage Instructions

1. **Fetch Current Tasks**: The application will fetch your current tasks from your calendar or Notion.
2. **Track Progress**: It will track your progress using Notion subtasks or other notes.
3. **Suggest Next Steps**: The application will suggest the next steps and add checklists to Notion directly.
4. **Task Breakdown**: For every new task, it will suggest a task breakdown and outline recursively.
5. **Ask Questions**: The application will ask you questions that it thinks will be important in planning.
6. **Research Module**: It will use a research module to gather additional context from the web.

## Installation and Setup

1. **Clone the Repository**: Clone this repository to your local machine.
   ```bash
   git clone https://github.com/githubnext/workspace-blank.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies.
   ```bash
   cd workspace-blank
   npm install
   ```

3. **Configure API Keys**: Set up your API keys for the calendar and Notion APIs. You can do this by creating a `.env` file in the root directory and adding your keys.
   ```
   CALENDAR_API_KEY=your_calendar_api_key
   NOTION_API_KEY=your_notion_api_key
   ```

4. **Run the Application**: Start the application by running the following command.
   ```bash
   npm start
   ```

5. **Access the Application**: Open your browser and navigate to `http://localhost:3000` to access the application.
