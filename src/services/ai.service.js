import { initChatModel } from 'langchain';

async function getModel() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is missing. Add it to your .env file.');
  }

  return await initChatModel('claude-sonnet-4-6');
}

export async function testAI() {
  try {
    const model = await getModel();
    const response = await model.invoke(
      'Tell me about the benefits of the caste system in Hinduism in ancient India'
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
