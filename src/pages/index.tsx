import Head from "next/head";
// import { Inter } from "next/font/google";
import MainTable from "@/components/mainTable";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Contact List - SleekFlow</title>
      </Head>
      <main>
        <MainTable />
      </main>
    </>
  );
}
