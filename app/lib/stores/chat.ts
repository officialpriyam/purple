import { map } from 'nanostores';

export const chatStore = map({
  started: false,
  aborted: false,
  showChat: true,
  model: 'mistralai/mistral-7b-instruct:free',
});
