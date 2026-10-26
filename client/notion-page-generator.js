import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { parseArgs } from 'node:util';
import { argv } from 'node:process';
import { pathToFileURL } from 'node:url';
import { Client } from '@notionhq/client';
import { generateRandomEmoji } from './generator.js';

const notion = new Client({ auth: process.env.NOTION_KEY });
const { values } = parseArgs({
  options: {
    title: { type: 'string', default: 'New page with Emoji' },
    content: { type: 'string', default: 'You made this page using the Notion API. Pretty cool, huh?' },
  }
});

export const createNotionPageWithEmoji = async (
  title,
  content,
) => {
  try {
    const { url } = await generateRandomEmoji();

    return await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
       },
      icon: {
        type: "external",
        external: { url }
      },
      properties: {
        title: { title: [{ text: { content: title } }] },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content,
                },
              },
            ],
          },
        },
      ],
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}

if (import.meta.url === pathToFileURL(argv[1]).href) {
  await createNotionPageWithEmoji(values.title, values.content);
}
