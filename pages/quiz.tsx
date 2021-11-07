import { CircularProgress } from "@rmwc/circular-progress";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import RoundedButton from "../components/Buttons/Rounded";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import firebase from "../utils/firebaseClient";

interface quizProps {}

export const quiz: React.FC<quizProps> = ({}) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  // console.log the current user and loading status
  const router = useRouter();
  const [collegeName, setCollegeName] = useState("");
  const [year, setYear] = useState("");
  const [hackerRankId, sethackerRankId] = useState("");
  const [isloading, setisloading] = useState(false);

  const db = firebase.firestore();

  const [participants, participantsLoading, participantsError] = useCollection(
    firebase.firestore().collection("participants"),
    {}
  );

  const SubmitDetails = async () => {
    setisloading(true);
    await db
      .collection("participants")
      .doc(user.uid)
      .set({
        name: user.displayName,
        email: user.email,
        college_name: collegeName,
        year: year,
        hackerRankId: hackerRankId,
      })
      .then(() => {
        setisloading(false);
        console.log("submitted");
      })
      .catch((err) => {
        console.log("error : ", err);
        alert("Unable to Submit details");
      });

    setisloading(false);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Quiz</title>
      </Head>
      <Navbar />
      <section className="pt-20">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="flex flex-wrap items-center mx-auto max-w-7xl">
            <div
              className="
              flex flex-col
              items-start
              mb-16
              text-left
              lg:flex-grow lg:w-1/2 lg:pr-24
              md:mb-0
            "
            >
              <span className="mb-8 text-xs font-bold tracking-widest text-blue-400 uppercase">
                {" "}
                MCQ - Round 1{" "}
              </span>
              <h1
                className="
                mb-8
                text-4xl
                font-bold
                leading-none
                tracking-tighter
                text-neutral-600
                md:text-7xl
                lg:text-5xl
              "
              >
                {" "}
                Code-O-Fiesta{" "}
              </h1>
              <p className="mb-8 text-base leading-relaxed text-left text-gray-300">
                {" "}
                Free and Premium themes, UI Kit's, templates and landing pages
                built with Tailwind CSS, HTML &amp; Next.js.{" "}
              </p>
              <img
                src="/quiz.png"
                className="self-center"
                style={{ width: 300, height: 300 }}
              />
            </div>

            <div className="w-full mt-12 lg:w-5/6 lg:max-w-lg rounded-xl xl:mt-0 shadow-lg p-4">
              <div>
                <div className="relative w-full max-w-lg space-y-4 justify-between pr-8 self-center">
                  <div
                    className="
                    absolute
                    top-0
                    rounded-full
                    bg-violet-300
                    -left-4
                    w-72
                    h-72
                    mix-blend-multiply
                    filter
                    blur-xl
                    opacity-70
                    animate-blob
                  "
                  ></div>

                  <div
                    className="
                    absolute
                    rounded-full
                    bg-fuchsia-300
                    -bottom-24
                    right-20
                    w-72
                    h-72
                    mix-blend-multiply
                    filter
                    blur-xl
                    opacity-70
                    animate-blob
                    animation-delay-4000
                  "
                  ></div>
                  <div className="relative">
                    <Input
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      required
                      className="bg-gray-200 m-4"
                      type="text"
                      placeholder="College Name"
                    />
                    <Input
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Year (Eg. 2nd Year)"
                      className="bg-gray-200 m-4"
                      type="text"
                    />
                    <Input
                      value={hackerRankId}
                      onChange={(e) => sethackerRankId(e.target.value)}
                      placeholder="HackerRank ID"
                      className="bg-gray-200 m-4"
                      type="text"
                    />
                    <RoundedButton
                      style={{
                        width: "16rem",
                        margin: "35px auto 0px",
                      }}
                      type="submit"
                      onClick={SubmitDetails}
                    >
                      {isloading ? <CircularProgress size="small" /> : null}
                      <span>Continue</span>
                    </RoundedButton>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default quiz;
