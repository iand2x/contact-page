import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Contact List - SleekFlow"
        description="View our list of contacts with their related information."
      />
      <Component {...pageProps} />
    </>
  );
}
