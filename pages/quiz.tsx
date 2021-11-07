import { CircularProgress } from "@rmwc/circular-progress";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import RoundedButton from "../components/Buttons/Rounded";
import Navbar from "../components/Navbar";
import firebase from "../utils/firebaseClient";

interface quizProps {}

export const quiz: React.FC<quizProps> = ({}) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const router = useRouter();
  const [isloading, setisloading] = useState(false);
  const [timeCounter, settimeCounter] = useState(0);

  const db = firebase.firestore();

  const [Ans, setAns] = useState("");
  const [cnt, setCnt] = useState(0);
  let [tempAns, settempAns] = useState<string>("");
  let [userAns, setUserAns] = useState<
    Array<{ question: string; ans: string }>
  >([]);
  let marks: number = 0;

  const [questions, questionsLoading, questionsError] = useCollection(
    firebase.firestore().collection("questions"),
    {}
  );

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        alert("This page is reloaded");
      }
    }
  }, []);

  const nextQuestion = async () => {
    userAns.push({
      ans: tempAns,
      question: questions.docs[cnt].get("question"),
    });
    settempAns("");
    setisloading(true);
    settimeCounter(timeCounter + 1);
    if (cnt < 19) setCnt(cnt + 1);
    else if (cnt === 19) {
      userAns.map((item, index) => {
        if (item.ans === questions.docs[index].get("ans")) marks = marks + 1;
      });

      await db
        .collection("participants")
        .doc(user.uid)
        .update({
          score: marks,
          user_ans: userAns,
        })
        .then(() => {
          setisloading(false);
          firebase.auth().signOut();
          router.replace("/codeofiesta");
        })
        .catch((err) => {
          alert("Unable to Submit details");
        });
    }

    setisloading(false);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Quiz</title>
      </Head>
      <Navbar />

      <section className="pt-20">
        {!questionsLoading && questions ? (
          <div className="container flex flex-col items-center px-5 py-8 mx-auto shadow-lg m-20 p-4">
            <div className="flex flex-col w-full mb-12 prose text-left prose border-b border-gray-200">
              <div className="w-full mx-auto">
                <h1>{questions.docs[cnt].get("question")}</h1>
              </div>
            </div>

            {questions.docs[cnt].get("image_url") != "" && (
              <img src={questions.docs[cnt].get("image_url")} />
            )}

            <div
              className="
            flex flex-col
            items-center
            py-6
            mx-auto
            mb-2
            prose
            border-b border-gray-200
            sm:flex-row
            lg:w-1/2
          "
            >
              <div className="inline-flex items-center flex-grow mt-6 text-left sm:mt-0">
                <span
                  className="
                pr-12
                text-xs
                font-semibold
                tracking-widest
                text-blue-600
                hover:text-neutral-600
              "
                >
                  <div className="flex items-center">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name="radio"
                          value={questions.docs[cnt].get("a")}
                          checked={
                            Ans == questions.docs[cnt].get("a") ? true : false
                          }
                          onChange={(e) => {
                            setAns(e.target.value);
                            settempAns(e.target.value);
                          }}
                        />
                        <span className="ml-2">
                          {questions.docs[cnt].get("a")}
                        </span>
                      </label>
                    </div>
                  </div>
                </span>
              </div>
            </div>

            <div
              className="
            flex flex-col
            items-center
            py-6
            mx-auto
            mb-2
            prose
            border-b border-gray-200
            sm:flex-row
            lg:w-1/2
          "
            >
              <div className="inline-flex items-center flex-grow mt-6 text-left sm:mt-0">
                <span
                  className="
                pr-12
                text-xs
                font-semibold
                tracking-widest
                text-blue-600
                hover:text-neutral-600
              "
                >
                  <div className="flex items-center">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name="radio"
                          value={questions.docs[cnt].get("b")}
                          checked={
                            Ans == questions.docs[cnt].get("b") ? true : false
                          }
                          onChange={(e) => {
                            setAns(e.target.value);
                            settempAns(e.target.value);
                          }}
                        />
                        <span className="ml-2">
                          {questions.docs[cnt].get("b")}
                        </span>
                      </label>
                    </div>
                  </div>
                </span>
              </div>
            </div>

            <div
              className="
            flex flex-col
            items-center
            py-6
            mx-auto
            mb-2
            prose
            border-b border-gray-200
            sm:flex-row
            lg:w-1/2
          "
            >
              <div className="inline-flex items-center flex-grow mt-6 text-left sm:mt-0">
                <span
                  className="
                pr-12
                text-xs
                font-semibold
                tracking-widest
                text-blue-600
                hover:text-neutral-600
              "
                >
                  <div className="flex items-center">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name="radio"
                          value={questions.docs[cnt].get("c")}
                          checked={
                            Ans == questions.docs[cnt].get("c") ? true : false
                          }
                          onChange={(e) => {
                            setAns(e.target.value);
                            settempAns(e.target.value);
                          }}
                        />
                        <span className="ml-2">
                          {questions.docs[cnt].get("c")}
                        </span>
                      </label>
                    </div>
                  </div>
                </span>
              </div>
            </div>

            <div
              className="
            flex flex-col
            items-center
            py-6
            mx-auto
            mb-2
            prose
            border-b border-gray-200
            sm:flex-row
            lg:w-1/2
          "
            >
              <div className="inline-flex items-center flex-grow mt-6 text-left sm:mt-0">
                <span
                  className="
                pr-12
                text-xs
                font-semibold
                tracking-widest
                text-blue-600
                hover:text-neutral-600
              "
                >
                  <div className="flex items-center">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name="radio"
                          value={questions.docs[cnt].get("d")}
                          checked={
                            Ans == questions.docs[cnt].get("d") ? true : false
                          }
                          onChange={(e) => {
                            setAns(e.target.value);
                            settempAns(e.target.value);
                          }}
                        />
                        <span className="ml-2">
                          {questions.docs[cnt].get("d")}
                        </span>
                      </label>
                    </div>
                  </div>
                </span>
              </div>
            </div>

            <div className="flex flex-row items-center justify-around space-x-10 mt-8">
              <Countdown
                date={Date.now() + 30000}
                onComplete={nextQuestion}
                key={cnt}
              />

              <RoundedButton
                style={{
                  width: "auto",
                }}
                type="submit"
                onClick={nextQuestion}
              >
                {isloading ? <CircularProgress size="small" /> : null}
                <span>{cnt == 19 ? "Submit" : "Next"}</span>
              </RoundedButton>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default quiz;
