/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Post } from "../../utils/posts.ts";

const post: Post = {
  id: 'hello',
  title: 'Hello World',
  publishAt: new Date(),
  content: 'Hello everybody what\'s going on. This is my first post',
  snippet: 'Hello everybody'
}

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <p class={tw`text-gray-600 mt-12`}>{post.publishAt.toLocaleDateString()}</p>
      <h1 class={tw`text-5xl mt-5 font-bold`} >{post.title}</h1>
      <div class={tw`mt-12`}>{post.content}</div>
    </div>
  )
}
