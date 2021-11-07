import { CircularProgress } from "@rmwc/circular-progress";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoundedButton from "../components/Buttons/Rounded";
import Footer from "../components/footer";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import firebase from "../utils/firebaseClient";
import { showToast } from "../utils/showToast";

interface quizProps {}

export const register: React.FC<quizProps> = ({}) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const router = useRouter();
  const [collegeName, setCollegeName] = useState("");
  const [year, setYear] = useState("");
  const [hackerRankId, sethackerRankId] = useState("");
  const [isloading, setisloading] = useState(false);
  const [inputDisable, setinputDisable] = useState(false);
  const [btnBg, setbtnBg] = useState("bg-gray-100");

  const db = firebase.firestore();
  // Configure FirebaseUI.
  const uiConfig = {
    signInSuccessUrl: "/register",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  const SubmitDetails = async () => {
    if (!user?.displayName) {
      alert("First signup using Gmail");
      return;
    }
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
        showToast("Successfully Registered", "success");
        setisloading(false);
        setinputDisable(true);
        setbtnBg("bg-gray-400");
      })
      .catch((err) => {
        showToast("Failed to register", "error");
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
      <ToastContainer />
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
              <p className="mb-4 text-base leading-relaxed text-left text-gray-400">
                {" "}
                A MCQ round based on basic programming, pseudocodes, data
                structures and algorithms, OOPs, etc.
              </p>
              <p className="text-base leading-relaxed text-left text-gray-400">
                {" "}
                You will get 90 seconds for each question and the test will be
                of 30 minutes.
              </p>
              <img
                src="/quiz.png"
                className="self-center"
                style={{ width: 500, height: 350 }}
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
                    {!loading && !user && (
                      <div>
                        {" "}
                        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                          First Verify Your Gmail
                        </h3>
                        <StyledFirebaseAuth
                          uiConfig={uiConfig}
                          firebaseAuth={firebase.auth()}
                        />
                        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                          Then fill this form
                        </h3>
                      </div>
                    )}

                    <Input
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      required
                      disabled={inputDisable}
                      className={`m-4 ${btnBg}`}
                      type="text"
                      placeholder="College Name"
                    />
                    <Input
                      value={year}
                      disabled={inputDisable}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Year (Eg. 2nd Year)"
                      className={`m-4 ${btnBg}`}
                      type="text"
                    />
                    <Input
                      value={hackerRankId}
                      disabled={inputDisable}
                      onChange={(e) => sethackerRankId(e.target.value)}
                      placeholder="HackerRank ID"
                      className={`m-4 ${btnBg}`}
                      type="text"
                    />
                    {inputDisable ? (
                      <RoundedButton
                        style={{
                          width: "16rem",
                          margin: "35px auto 0px",
                        }}
                        type="submit"
                        onClick={() => router.push("/quiz")}
                      >
                        {isloading ? <CircularProgress size="small" /> : null}
                        <span>Start Test</span>
                      </RoundedButton>
                    ) : (
                      <RoundedButton
                        style={{
                          width: "16rem",
                          margin: "35px auto 0px",
                        }}
                        type="submit"
                        onClick={SubmitDetails}
                      >
                        {isloading ? <CircularProgress size="small" /> : null}
                        <span>Submit</span>
                      </RoundedButton>
                    )}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default register;
