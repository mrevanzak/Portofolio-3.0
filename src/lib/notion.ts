import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

import { env } from '@/env.mjs';

import { LinkResult } from '@/types/notion';

const DB = env.NOTION_DATABASE;
const KEY = env.NOTION_KEY;

const notion = new Client({
  auth: KEY,
});
const notionAPI = new NotionAPI();

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
    sorts: [
      {
        property: 'Rank',
        direction: 'ascending',
      },
    ],
  });

  const result = response.results as unknown as LinkResult[];

  return result.map((project) => ({
    id: project.id,
    title: project.properties.Title.title[0].plain_text,
    tags: project.properties.Tags.multi_select.map((tag) => tag.name),
    slug: project.properties.Slug.rich_text[0]?.plain_text,
  }));
};

export const getProjectDetail = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: DB,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  });

  const result = response.results[0] as unknown as LinkResult;
  return await notionAPI.getPage(result.id);
};
