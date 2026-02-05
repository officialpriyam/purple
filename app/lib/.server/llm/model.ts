import { createOpenAI } from '@ai-sdk/openai';

export function getModel(model: string, apiKey: string) {
  const openRouter = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey,
    headers: {
      'HTTP-Referer': import.meta.env.VITE_SITE_URL || 'https://bolt.new', // Optional, for including your app on openrouter.ai rankings.
      'X-Title': import.meta.env.VITE_SITE_TITLE || 'Purple', // Optional. Shows in rankings on openrouter.ai.
    },
  });

  return openRouter(model);
}
