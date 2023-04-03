import { ActionFunction, json } from '@remix-run/node';
import { chatGpt } from '~/models/chat.server';
import { validateString } from '~/models/validators.server';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const prompt = form.get('prompt') as string;

  const errors = {
    prompt: validateString(prompt),
  };

  if (errors.prompt) {
    return json({ errors }, { status: 400 });
  }

  const chat = await chatGpt(prompt);

  return json(chat);
};
