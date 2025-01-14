const prompts = {
  generateTaskBreakdownPrompt(task) {
    return `Please provide a detailed breakdown of the task: ${task.description}. Start with top-level subtasks and then further break down each subtask. Ensure that the subtasks are atomic and exhaustive.`;
  },

  generateNextStepsPrompt(task, context) {
    return `Based on the current context: ${JSON.stringify(context)}, suggest the next steps for the task: ${task.description}. Consider the progress made so far and any additional context.`;
  },

  generateQuestionnairePrompt(task, context) {
    return `Generate a set of questions for the task: ${task.description} with the current context: ${JSON.stringify(context)}. These questions should help in planning and gathering necessary information.`;
  },

  generateResearchPrompt(task) {
    return `Research the following task: ${task.description} and provide any additional context or information that might be useful.`;
  },

  generateSubtaskCompletionPrompt(task, subtask) {
    return `The subtask: ${subtask.description} has been completed for the task: ${task.description}. Based on the current context, suggest the next steps or conclude the task if all subtasks are completed.`;
  },

  generateDeepThinkingPrompt(task) {
    return `Think deeply about the task: ${task.description} and provide any additional insights or considerations that might be important for planning and execution.`;
  },

  generateChecklistPrompt(task, nextSteps) {
    return `Create a checklist for the task: ${task.description} with the following next steps: ${nextSteps.join(', ')}. Ensure that the checklist is detailed and covers all necessary actions.`;
  },

  generateSubtaskManagementPrompt(task, subtask) {
    return `Manage the subtask: ${subtask.description} for the task: ${task.description}. Based on the current context, suggest the next steps or conclude the task if all subtasks are completed.`;
  },

  generateDetailedPrompt(task, context, examples) {
    return `Task: ${task.description}\nContext: ${JSON.stringify(context)}\nExamples: ${examples.join('\n')}\nPlease provide a detailed response based on the above information.`;
  }
};

module.exports = prompts;
