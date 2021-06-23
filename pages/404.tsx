/* eslint-disable @next/next/no-img-element */
import { IconButton } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/404.module.css";
export interface PageNotFoundProps {}

const PageNotFound: React.SFC<PageNotFoundProps> = () => {
  return (
    <div className={[styles.content, "min-h-screen flex bg-black"].join(" ")}>
      <div className="relative hidden xl:block xl:w-3/5 h-screen">
        <img className="h-screen" src="./background.png" alt="bg" />
      </div>
      <div className="group xl:w-2/5 rounded-lg mx-12 my-12 xl:ml-16 xl:mr-72 xl:mt-44">
        <div>
          <a href="https://techanalogy.org">
            <Image src="/Logotech.png" width={420} height={150} alt="logo" />
          </a>
          <h2 className="mt-16 text-6xl font-extrabold text-white">
            Seems like you strayed off
          </h2>
        </div>
        <br />
        <Link href="/" passHref>
          <div className="bg-gray-700 rounded-lg p-6 text-white flex cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <p className="pl-4 text-lg font-bold">Go to Home</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
