/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from '$fresh/server.ts'
import { tw } from "@twind";
import { loadPost, Post } from "../../utils/posts.ts";
import * as gfm from "https://deno.land/x/gfm@0.1.22/mod.ts";


export const handler: Handlers<Post> = {
  async GET(req, ctx) {
    const id = ctx.params.id
    const post = await loadPost(id)
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }
    return ctx.render(post);
  }
}

export default function BlogPostPage(props: PageProps) {
  const post = props.data
  const dateFmt = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  });
  const html = gfm.render(post.content)
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <a href="/">home</a>
      <p class={tw`text-gray-600 mt-12`}>
        {dateFmt.format(post.publishAt)}
      </p>
      <h1 class={tw`text-5xl mt-5 font-bold`} >{post.title}</h1>
      <style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
      <div class={tw`mt-12` + " markdown-body"} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
