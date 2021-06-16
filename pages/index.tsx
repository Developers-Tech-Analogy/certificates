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

  async function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    toast({
      title: "Fetching Data",
      description: "Our minions are getting your certificate",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="group max-w-md w-full  border-2 border-white rounded-lg space-y-8 p-11 transition duration-700 ease-in-out hover:bg-gray-200 hover:scale-15 0 cursor-pointer">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src="./Logotech.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white group-hover:text-black">
            Reap the rewards of your hard work
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <p className="sr-only">Email address</p>
              <Tooltip label="Enter the email id you registered with" aria-label="email">
              <input
                id="email-address"
                name="emailID"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              </Tooltip>
            </div>
            <div className="justify-content-center w-full bg-white rounded-md">
              <Select placeholder="Select Event" icon={<ArrowUpDownIcon />}>
                <option>Autogenix</option>
                <option>Mechenzie</option>
              </Select>
            </div>
          </div>
          <div>
            {responseMessage && (
              <div>
                {error ? (
                  <h4
                    className={["mb-4 font-medium", "text-red-500"].join(" ")}
                  >
                    {responseMessage}
                  </h4>
                ) : (
                  <h4
                    className={["mb-4 font-medium", "text-green-500"].join(" ")}
                  >
                    {responseMessage}
                  </h4>
                )}
              </div>
            )}
            <div className="text-center">
              <Button colorScheme="blue" type="submit">
                Get Certificate
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
