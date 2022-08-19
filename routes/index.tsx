/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { listPosts, Post } from "../utils/posts.ts";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.0.2/server.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render(posts);
  }
}

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1 class={tw`text-5xl mt-12 font-bold`} >Dylan's Blog</h1>
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
    <li class={tw`border-t`} >
      <a href={`/blog/${post.id}`} class={tw`py-2 flex gap-4 group`}>
        <div>{dateFmt.format(post.publishAt)}</div>
        <div>
          <h2 class={tw`font-bold text-xl group-hover:underline`}>{post.title}</h2>
          <p class={tw`text-gray-600`}>{post.snippet}</p>
        </div>
      </a>
    </li >
  )
}