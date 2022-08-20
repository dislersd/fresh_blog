/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { listPosts, Post } from "../utils/posts.ts";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.0.2/server.ts";
import { COPY } from "@constants";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render(posts);
  }
}

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md bg-black`}>
      <h1 class={tw`text-5xl font-bold bg-white p-4 w-full`} >{COPY.BLOG_TITLE}</h1>
      <ul class={tw`mt-8`}>
        {posts.map(post => <PostEntry post={post} />)}
      </ul>
    </div>
  );
}

function PostEntry(props: { post: Post }) {
  const post = props.post
  const dateFmt = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
  });
  return (

    <a href={`/blog/${post.id}`} class={tw`py-2 flex-column gap-4`}>
      <li class={tw`text-white border border-solid rounded my-4 p-4 group`} >
        <div class={tw`mb-4`}>{dateFmt.format(post.publishAt)}</div>
        <div>
          <h2 class={tw`font-bold text-xl group-hover:underline group-hover:bg-pink-100 group-hover:text-black`}>{post.title}</h2>
          <p class={tw`text-pink-300`}>{post.snippet}</p>
        </div>
      </li >
    </a>
  )
}