export async function chatGpt(prompt: string) {
  const id: string = String(Date.now());
  const errorMessage = {
    id,
    type: 'assistant',
    text: 'Lo lamento, no puedo responder tu pregunta.',
  };
  console.log('prompt', prompt);
  try {
    const chat = await fetch(process.env.OPENAI_API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'Eres un asistente útil.' }].concat({
          role: 'user',
          content: `${process.env.DEFAULT_MESSAGE} ${prompt}`,
        }),
      }),
    });
    const chatJson = await chat.json();
    return {
      id,
      type: 'assistant',
      text: chatJson.choices[0].message.content,
    };
  } catch (error) {
    console.error(error);
    return errorMessage;
  }
}
