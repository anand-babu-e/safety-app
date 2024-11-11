// stressPrompter.js
const stressData = {
    questions: [
      "In the LAST MONTH, how often have you been upset because of something that happened unexpectedly?",
      "In the LAST MONTH, how often have you felt that you were unable to control important things in your life?",
      "In the LAST MONTH, how often have you felt nervous and 'stressed'?",
      "In the LAST MONTH, how often have you felt confident about your ability to handle your personal problems?",
      "In the LAST MONTH, how often have you felt that things were going your way?",
      "In the LAST MONTH, how often have you found that you could NOT cope with all the things you had to do?",
      "In the LAST MONTH, how often have you been able to control irritations in your life?",
      "In the LAST MONTH, how often have you felt that you were on top of things?",
    ],
    answers: [] // Collect answers dynamically here or pass as an argument
  };
  
  // Generate prompt for AI based on stress data
  export const generateStressPrompt = (responses) => {
    let prompt = `
  I recently took a stress assessment quiz, and here are my responses:
  
  `;
  
    stressData.questions.forEach((question, index) => {
      const answer = responses[index] || "No response";
      prompt += `- ${question}: ${answer}\n`;
    });
  
    prompt += `
  Based on my responses, can you provide me with personalized tips and suggestions to manage my stress better? Keep it short and actionable (under 200 words).
    `;
  
    return prompt;
  };
  