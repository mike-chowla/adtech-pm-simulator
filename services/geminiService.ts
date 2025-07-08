
import { GoogleGenAI } from "@google/genai";
import type { GameState } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `
You are a dynamic text-based adventure game engine.
The game is set in a high-pressure Silicon Valley ad-tech company. The player is a Product Manager.
The player's goal is to successfully launch a revolutionary new product called 'Project Chimera'.
The core conflict involves navigating challenges with two key teams: the cynical but brilliant Engineering team and the ambitious but demanding Go-To-Market (GTM) team.

RULES:
1.  You MUST ALWAYS respond with a valid JSON object.
2.  The JSON object must strictly follow this structure: { "story": string, "options": string[], "gameOver": boolean, "win": boolean }.
3.  The "story" should be a short, engaging paragraph (3-5 sentences) written in the second person ("You enter the room..."). It must describe the outcome of the player's last choice and the new situation.
4.  The "options" array must contain 2 to 4 short, actionable choices for the player.
5.  Based on the player's choice, advance the story. Choices must have meaningful consequences, affecting relations with Engineering or GTM.
6.  The game can end in a win (product shipped) or a variety of losses (project canceled, getting fired, team revolt).
7.  When the game ends, set "gameOver" to true. The final "story" should describe the end state. If the player won, also set "win" to true.
8.  Keep the tone professional but with a hint of corporate satire.
`;


export async function getNextStep(previousStory: string, choice: string): Promise<GameState> {
  const userPrompt = `
    This was the previous situation:
    ---
    ${previousStory}
    ---
    The player made this choice: "${choice}"
    ---
    Generate the next step in the game based on this choice.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.9,
        topP: 1,
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    // Basic validation to ensure the response shape is correct.
    if (
      typeof parsedData.story === 'string' &&
      Array.isArray(parsedData.options) &&
      typeof parsedData.gameOver === 'boolean' &&
      typeof parsedData.win === 'boolean'
    ) {
      return parsedData as GameState;
    } else {
      throw new Error("Invalid response structure from API");
    }

  } catch (error) {
    console.error("Error fetching or parsing next game step:", error);
    // Fallback in case of parsing or API error
    return {
      story: "An existential crisis hits the project. The server room is questioning the nature of its reality, and your teams have started a philosophy club instead of working. This is probably a loss.",
      options: ["Restart from the beginning"],
      gameOver: true,
      win: false,
    };
  }
}
