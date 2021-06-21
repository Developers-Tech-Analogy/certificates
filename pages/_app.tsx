import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Certificates @ Tech Analogy</title>
        <meta name="description" content="Reap the rewards of your hard work" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
}

export default MyApp;
