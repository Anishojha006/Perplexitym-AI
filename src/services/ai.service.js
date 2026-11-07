import { ChatGroq } from '@langchain/groq';

let model;

function getModel() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is missing. Add it to your .env file.');
  }

  if (!model) {
    model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: 'openai/gpt-oss-120b',
      temperature: 0,
    });
  }

  return model;
}

export async function testAI() {
  try {
    const response = await getModel().invoke(
      "write an HTML code form an form"
    );

    const text =
      typeof response?.text === 'string'
        ? response.text
        : typeof response?.content === 'string'
          ? response.content
          : JSON.stringify(response);

    console.log('Response from AI:', text);
    return text;
  } catch (error) {
    console.error('Error in testAI function:', error);
    throw error;
  }
}
