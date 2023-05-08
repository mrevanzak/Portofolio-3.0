//#region  //*=========== Links ===========
export interface LinkResult {
  id: string;
  properties: LinkProperties;
}

interface LinkProperties {
  Title: TitleColumn;
  Tags: MultiSelectColumn;
  Date: DateColumn;
  Excerpt: TextColumn;
  Image: ImageColumn;
  slug: TextColumn;
}
//#endregion  //*======== Links ===========

//#region  //*=========== Commons ===========
interface DateColumn {
  id: string;
  type: 'date';
  date: { start: string };
}

interface ImageColumn {
  id: string;
  type: 'files';
  files: [File];
}

interface ExternalIcon {
  type: 'external';
  external: {
    url: string;
  };
}
interface EmojiIcon {
  type: 'emoji';
  emoji: string;
}
interface FileIcon {
  type: 'file';
  file: { url: string };
}
export type PageIcon = ExternalIcon | EmojiIcon | FileIcon | null;

interface TitleColumn {
  id: string;
  type: 'title';
  title: [RichText];
}

interface TextColumn {
  id: string;
  type: 'rich_text';
  rich_text: [RichText | undefined];
}

// interface NumberColumn {
//   id: string;
//   type: 'number';
//   number: number;
// }

interface MultiSelectColumn {
  id: string;
  multi_select: Array<{ name: string }>;
}

interface RichText {
  type: string;
  plain_text: string;
}

interface File {
  name: string;
  file: { url: string };
  type: string;
}
//#endregion  //*======== Commons ===========
