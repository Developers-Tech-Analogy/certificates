/* eslint-disable @next/next/no-img-element */
import { IconButton } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/404.module.css";
export interface DownloadFileProps {}

const DownloadFile: React.FC<DownloadFileProps> = () => {
  const router = useRouter();

  return (
    <div className={[styles.content, "min-h-screen flex bg-black"].join(" ")}>
      <div className="relative hidden xl:block xl:w-3/5 h-screen">
        <img className="h-screen" src="/background.png" alt="bg" />
      </div>
      <div className="group xl:w-2/5 rounded-lg mx-12 my-12 xl:ml-16 xl:mr-72 xl:mt-44">
        <div>
          <a href="https://techanalogy.org">
            <Image src="/Logotech.png" width={420} height={150} alt="logo" />
          </a>
          <h2 className="mt-16 text-xl font-extrabold text-white mb-16">
            Congrats, we found your file. Each certificate come with an unique
            ID so you can always show your newly learnt skill and also be backed
            by us here at Tech Analogy. To check for validity of your
            certificate just get it verified from us by visiting{" "}
            <Link href="/verify" passHref>
              <p className="underline">certificates.techanalogy.org/verify</p>
            </Link>
          </h2>
        </div>
        <br />

        <a download href={router.query.url as string}>
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <p className="pl-4 text-lg font-bold">Download File</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default DownloadFile;
