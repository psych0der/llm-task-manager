const calendar = require('./calendar');
const notion = require('./notion');
const taskManager = require('./taskManager');
const contextManager = require('./contextManager');
const questionnaire = require('./questionnaire');
const researchModule = require('./researchModule');

async function main() {
  // Initialize the application
  console.log('Initializing application...');

  // Fetch current tasks from the calendar
  const calendarTasks = await calendar.fetchCurrentTasks();
  console.log('Fetched tasks from calendar:', calendarTasks);

  // Fetch current tasks from Notion
  const notionTasks = await notion.fetchCurrentTasks();
  console.log('Fetched tasks from Notion:', notionTasks);

  // Combine tasks from both sources
  const allTasks = [...calendarTasks, ...notionTasks];

  // Process each task
  for (const task of allTasks) {
    // Maintain context of the work done
    contextManager.storeContext(task);

    // Ask necessary questions
    const questions = questionnaire.generateQuestions(task);
    const answers = await questionnaire.processQuestions(questions);

    // Research additional context if needed
    const additionalContext = await researchModule.gatherContext(task);

    // Suggest next steps and add checklists
    const nextSteps = taskManager.suggestNextSteps(task, additionalContext);
    await notion.addChecklist(task, nextSteps);

    // Track progress and update Notion
    await notion.updateTaskProgress(task);
  }

  console.log('Application finished processing tasks.');
}

main().catch(error => {
  console.error('Error in application:', error);
});
