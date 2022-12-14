/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Hello world!" />
        <link rel="stylesheet" href="/app.css" />
      </Head>
      <Component />
    </>
  );
}