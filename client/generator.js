import { emojiList } from './emoji-list.js';

const MAX_ATTEMPTS = 5;

export const generateRandomEmoji = async (
  randomEmoji1 = emojiList[Math.floor(Math.random() * emojiList.length)],
  randomEmoji2 = emojiList[Math.floor(Math.random() * emojiList.length)],
  attempt = 1
) => {
  const response = await fetch(
    `https://emojik.vercel.app/s/${encodeURIComponent(randomEmoji1)}_${encodeURIComponent(randomEmoji2)}?size=128`
  )

  if (!response.ok || response.headers.get('status') === '404') {
    if (attempt >= MAX_ATTEMPTS) {
      throw new Error(`Failed to generate emoji after ${MAX_ATTEMPTS} attempts`);
    }
    return generateRandomEmoji(undefined, undefined, attempt + 1);
  }

  return await response;
};
