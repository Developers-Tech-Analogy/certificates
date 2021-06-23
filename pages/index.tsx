/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import styles from "../styles/Home.module.css";
import { IconButton, Select, Switch, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import {
  ArrowForwardIcon,
  ArrowRightIcon,
  ArrowUpDownIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import Footer from "../components/Footer";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  function showToast(
    level: "info" | "warning" | "error" | "success",
    title: string,
    message: string
  ) {
    toast({
      title: title,
      description: message,
      status: level,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  async function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    setLoading(true);
    showToast(
      "info",
      "Fetching Data",
      "Our minions are getting your certificate"
    );
    const result = await fetch("/api/createCertificate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        eventName: event,
      }),
    });
    const data = await result.json();
    setLoading(false);
    if (result.status === 201) {
      showToast(
        "success",
        "Yay!!!",
        "Our minions carried your certificate all the way to your inbox!!!"
      );
    } else {
      if (result.status === 404) {
        showToast(
          "error",
          "Oops!!!",
          "We couldn't find your certificate. If you think this is a mistake, mail to us at info@techanalogy.org"
        );
      } else {
        showToast("error", "Oops!!!", data.message);
      }
    }
  }

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
          <h2 className="mt-6 text-2xl font-extrabold text-white">
            Reap the Rewards of your hard work!
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  shadow-sm">
            <div>
              <p className="sr-only">Email address</p>
              <Tooltip
                label="Enter the email id you registered with"
                aria-label="email"
              >
                <input
                  id="email-address"
                  name="emailID"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 mb-2 bg-transparent border-b-2 border-gray-300 placeholder-gray-500 text-gray-100  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email ID"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Tooltip>
            </div>
            <div className="justify-content-center w-full bg-transparent border-b-2 text-gray-400 sm:text-sm outline-none">
              <Select
                placeholder="Select Event"
                icon={<ArrowUpDownIcon />}
                isRequired
                border="0px"
                onChange={(e) => setEvent(e.target.value)}
              >
                <option>Autogenix</option>
                <option>Mechenzie</option>
                <option>E-Sports</option>
              </Select>
            </div>
            <div className="flex pt-10">
              {!loading ? (
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  variant="solid"
                  type="submit"
                >
                  Get Certificate
                </Button>
              ) : (
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  variant="solid"
                  isLoading
                >
                  Get Certificate
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
