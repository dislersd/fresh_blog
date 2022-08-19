import { extract } from "$std/encoding/front_matter.ts";

export interface Post {
  id: string;
  title: string;
  publishAt: Date;
  snippet: string;
  content: string;
}

export async function loadPost(id: string): Promise<Post | null> {
  let text;
  try {
    text = await Deno.readTextFile(`./data/posts/${id}.md`);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return null;
    }
    throw error;
  }

  const { attrs, body } = extract(text);
  const params = attrs as Record<string, string>;
  const publishAt = new Date(params.publish_at);
  return {
    id,
    title: params.title,
    publishAt,
    snippet: params.snippet,
    content: body,
  };
}