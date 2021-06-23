import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import "../styles/globals.css";
import { customerly } from "react-customerly";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    customerly.initialize(process.env.NEXT_PUBLIC_CUSTOMERLY_ID, {
      widget_position: "right",
      widget_color: "06d6a0",
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Certificates @ Tech Analogy</title>
        <meta name="description" content="Reap the rewards of your hard work" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Tech Analogy" />
        <meta property="og:url" content="https://techanalogy.org" />
        <meta property="og:title" content="Certificates @ Tech Analogy" />
        <meta
          property="og:description"
          content="Reap the rewards of your hard work"
        />
        <meta
          property="og:image"
          content="https://billboard.srmkzilla.net/api/blog?title=Certificates&subtitle=Tech%20Analogy&theme=dark"
        />
      </Head>
      <ThemeProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
