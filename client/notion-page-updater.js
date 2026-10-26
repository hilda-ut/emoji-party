import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { Client } from '@notionhq/client';
import { generateRandomEmoji } from './generator.js';

const notion = new Client({ auth: process.env.NOTION_KEY });

export const updateNotionPageWithEmoji = async (pageId) => {
  try {
    const { url } = await generateRandomEmoji();

    return await notion.pages.update({
      page_id: pageId,
      icon: {
        type: "external",
        external: { url }
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}
