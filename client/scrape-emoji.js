import fs from 'fs';
import { argv } from 'node:process';
import { pathToFileURL } from 'node:url';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import { emojiList } from './emoji-list.js';
import { generateRandomEmoji } from './generator.js';

export const scrapeEmoji = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const randomEmoji1 = emojiList[Math.floor(Math.random() * emojiList.length)];
  const randomEmoji2 = emojiList[Math.floor(Math.random() * emojiList.length)];

  try {
    const { url } = await generateRandomEmoji(randomEmoji1, randomEmoji2);

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 5000 });

    const response = await fetch(url);
    const buffer = await response.buffer();

    fs.writeFileSync(`../output/${randomEmoji1}_${randomEmoji2}.png`, buffer);

    return url;
  } catch (error) {
    console.error('Error:', error);
    return null;
  } finally {
    await browser.close();
  }
};

if (import.meta.url === pathToFileURL(argv[1]).href) {
  await scrapeEmoji();
}
