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

export const getProjects = async () => {
  const response = await notion.databases.query({
    database_id: DB,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
  });

  const result = response.results as unknown as LinkResult[];

  // console.log(result);

  // return result;
  return result.map((project) => ({
    id: project.id,
    title: project.properties.Title.title[0].plain_text,
    tags: project.properties.Tags.multi_select.map((tag) => tag.name),
    image: project.properties.Image.files[0].file.url,
  }));
};