const notionAPI = require('./notion');
const contextManager = require('./contextManager');
const questionnaire = require('./questionnaire');
const researchModule = require('./researchModule');
const llm = require('./llm');

const taskManager = {
  async suggestNextSteps(task) {
    // Check if the task is completed
    if (task.isCompleted) {
      console.log('Task is already completed.');
      return;
    }

    // Fetch the current context
    const context = await contextManager.getContext(task.id);

    // Ask necessary questions
    const questions = await questionnaire.generateQuestions(task, context);
    const answers = await questionnaire.getAnswers(questions);

    // Research additional context if needed
    const additionalContext = await researchModule.getAdditionalContext(questions, answers);

    // Suggest next steps based on the context and additional context
    const nextSteps = this.generateNextSteps(task, context, additionalContext);

    // Add the next steps as a checklist to the task in Notion
    await notionAPI.addChecklist(task, nextSteps);

    // Update the context with the new information
    await contextManager.updateContext(task.id, { ...context, ...additionalContext });

    console.log('Next steps suggested and checklist added to Notion.');
  },

  generateNextSteps(task, context, additionalContext) {
    // Implement logic to generate next steps based on the context and additional context
    // This is a placeholder implementation
    return [
      'Step 1: Do something based on context and additional context',
      'Step 2: Do something else based on context and additional context'
    ];
  },

  async manageTasks(tasks) {
    for (const task of tasks) {
      // Maintain context of the work done
      const context = await contextManager.getContext(task.id);

      // Ask necessary questions
      const questions = await questionnaire.generateQuestions(task, context);
      const answers = await questionnaire.getAnswers(questions);

      // Research additional context if needed
      const additionalContext = await researchModule.getAdditionalContext(questions, answers);

      // Suggest next steps and add checklists
      const nextSteps = this.generateNextSteps(task, context, additionalContext);
      await notionAPI.addChecklist(task, nextSteps);

      // Track progress and update Notion
      await notionAPI.updateTaskProgress(task);

      // Update the context with the new information
      await contextManager.updateContext(task.id, { ...context, ...additionalContext });
    }
  }
};

module.exports = taskManager;
