import { Client } from '@notionhq/client';

import { env } from '@/env.mjs';

import { LinkResult } from '@/types/notion';

const DB = env.NOTION_DATABASE;
const KEY = env.NOTION_KEY;

const notion = new Client({
  auth: KEY,
});

export const getCV = async () => {
  const response = await notion.databases.query({
    database_id: DB,
    filter: {
      property: 'Title',
      title: {
        equals: 'CV',
      },
    },
  });

  const result = response.results[0] as unknown as LinkResult;

  return {
    file: result.properties.Image.files[0].file.url,
  };
};
