/* eslint-disable @next/next/no-img-element */
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { Tooltip, Select, Button, useToast } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
export interface VerifyPageByIdProps {}

const VerifyPageById: React.FC<VerifyPageByIdProps> = () => {
  const toast = useToast();
  const [id, setID] = useState("");
  const [loading, setLoading] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [participantEvent, setParticipantEvent] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (router.query.id !== undefined) {
      const id = router.query.id;
      console.log(id);
      setID(id.toString());
    }
  }, [router.query.id]);
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
  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setLoading(true);
    showToast(
      "info",
      "Verifying Data",
      "Our minions are getting the relevant data"
    );
    const result = await fetch("/api/verifyCertificate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    console.log(result.status);
    if (result.status === 200) {
      showToast(
        "success",
        "Yay! Certificate Found",
        "Our minions have the data you requested"
      );
      const data = await result.json();
      console.log(data.participant.name);
      setParticipantEvent(data.participant.eventName);
      setParticipantName(data.participant.name);
    } else {
      setParticipantEvent("");
      setParticipantName("");
      if (result.status === 404) {
        showToast(
          "warning",
          "Certificate Not Found",
          "The certificate does not exist"
        );
      }
      else if(result.status === 422){
        showToast(
          "warning",
          "Invalid ID",
          "The given ID is invalid"
        );
      } else {
        showToast(
          "error",
          "Oops! We ran into an error",
          "We ran into an error. We'll look into it to get us up & going"
        );
      }
    }
    setLoading(false);
  };
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
          <h2 className="mt-6 text-2xl font-extrabold text-white">
            Not just a certificate but a trusted proof of your skills
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  shadow-sm">
            <div>
              <p className="sr-only">Certificate ID</p>
              <Tooltip
                label="Enter the email id you registered with"
                aria-label="email"
              >
                <input
                  id="email-address"
                  name="certificateID"
                  type="certificate"
                  required
                  value={id}
                  className="appearance-none relative block w-full px-3 py-2 mb-2 bg-transparent border-b-2 border-gray-300 placeholder-gray-500 text-gray-100  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Certificate ID"
                  onChange={(e) => setID(e.target.value)}
                />
              </Tooltip>
            </div>
            <div className="pt-10">
              {!loading ? (
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  variant="solid"
                  type="submit"
                >
                  Verify Certificate
                </Button>
              ) : (
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  variant="solid"
                  isLoading
                >
                  Verify Certificate
                </Button>
              )}
              <br />
              <br />
              <Link href="/" passHref>
                <Button
                  rightIcon={<ArrowBackIcon />}
                  colorScheme="teal"
                  variant="outline"
                >
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </form>
        {participantName.length !== 0 ? (
          <div className="pt-10">
            <h1 className="text-xl font-semibold text-white py-3">
              Name : {participantName}
            </h1>
            <h1 className="text-xl font-semibold text-white py-3">
              Event : {participantEvent}
            </h1>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default VerifyPageById;
