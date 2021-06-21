/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import styles from "../styles/Home.module.css";
import { Select, Tooltip } from "@chakra-ui/react";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
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
    <div className="min-h-screen flex bg-black">
      <img className="h-screen w-3/5" src="./background.png" alt="Workflow" />
      <div className="group max-w-md w-full rounded-lg space-y-8 p-11">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src="./Logotech.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-lg font-extrabold text-white">
            Reap the Rewards of your hard work!
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  shadow-sm -space-y-px">
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
            <div className="justify-content-center w-full bg-transparent border-b-2 text-gray-400 sm:text-sm">
              <Select
                placeholder="Select Event"
                icon={<ArrowUpDownIcon />}
                isRequired
                border="0px"
                onChange={(e) => setEvent(e.target.value)}
              >
                <option>Autogenix</option>
                <option>Mechenzie</option>
              </Select>
            </div>
          </div>

          <Button colorScheme="blue" type="submit" w={250}>
            Get Certificate
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
