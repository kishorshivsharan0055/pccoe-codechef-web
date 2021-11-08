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

interface quizProps {
  date: string;
}

export const quiz: React.FC<quizProps> = ({ date }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const router = useRouter();
  const [isloading, setisloading] = useState(false);
  let countTimer = false;

  const db = firebase.firestore();

  const [response, resLoading, resError] = useCollection(
    firebase.firestore().collection("responses"),
    {}
  );

  const [Ans, setAns] = useState("");
  const [cnt, setCnt] = useState(0);
  let [tempAns, settempAns] = useState<string>("");
  let [userAns, setUserAns] = useState<
    Array<{ question: string; ans: string }>
  >([]);

  useEffect(() => {
    for (var i = 0; i < 20; i++) {
      userAns.push({
        ans: "",
        question: "",
      });
    }
  }, []);

  let marks: number = 0;

  const [questions, questionsLoading, questionsError] = useCollection(
    firebase.firestore().collection("questions"),
    {}
  );

  let [timer] = useState(
    response ? response?.docs[0]?.get("date") : "November 8, 2021 09:30:00"
  );

  // useEffect(() => {
  //   if (response) {
  //     timer = response?.docs[0]?.get("date");
  //   }

  //   const currTime = Date.now();
  //   if (currTime > new Date(timer).getTime()) {
  //     console.log("time up");
  //     router.replace("/register");
  //   }
  // }, [!resLoading]);

  // const [timer, settimer] = useState(Date.now() + 8000);

  // useEffect(() => {
  //   if (window.performance) {
  //     if (performance.navigation.type == 1) {
  //       alert("This page is reloaded, You will be logged out");
  //       firebase.auth().signOut();
  //     }
  //   }
  // }, []);

  const prevQuestion = () => {
    if (response?.docs[0]?.get("take_response") == false) {
      router.replace("/register");
    }

    timer = response?.docs[0]?.get("date");
    if (tempAns != "") {
      userAns[cnt].ans = tempAns;
      userAns[cnt].question = questions.docs[cnt].get("question");
    }
    settempAns("");
    setCnt(cnt - 1);
  };

  const nextQuestion = async () => {
    if (response?.docs[0]?.get("take_response") == false) {
      router.replace("/register");
    }

    timer = response?.docs[0]?.get("date");
    if (tempAns != "") {
      userAns[cnt].ans = tempAns;
      userAns[cnt].question = questions.docs[cnt].get("question");
    }
    settempAns("");
    setisloading(true);

    if (cnt < 19 && countTimer == false) {
      setCnt(cnt + 1);
    } else if (cnt === 19 || countTimer == true) {
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
      router.push("/register");
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Quiz</title>
      </Head>
      <Navbar />

      <section className="pt-20">
        {!questionsLoading && questions ? (
          <div className="container flex flex-col items-center px-5 py-8 mx-auto shadow-lg m-20 p-4">
            <div className="flex flex-wrap">
              {userAns.map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: item.ans == "" ? "red" : "green",
                    margin: 2,
                    color: "white",
                    textAlign: "center",
                    borderWidth: index === cnt ? 4 : 0,
                    borderColor: index === cnt ? "blue" : "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (tempAns != "") {
                      userAns[cnt].ans = tempAns;
                      userAns[cnt].question =
                        questions.docs[cnt].get("question");
                    }
                    timer = response?.docs[0]?.get("date");
                    if (response?.docs[0]?.get("take_response") == false) {
                      router.replace("/register");
                    }
                    settempAns("");
                    setCnt(index);
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full mb-12 prose text-left prose border-b border-gray-200 mt-5">
              <div className="w-full mx-auto">
                <h1>{cnt + 1 + ". " + questions.docs[cnt].get("question")}</h1>
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
              <RoundedButton
                style={{
                  width: "auto",
                }}
                type="submit"
                disabled={cnt === 0}
                onClick={prevQuestion}
              >
                {isloading ? <CircularProgress size="small" /> : null}
                <span>Previous</span>
              </RoundedButton>

              <Countdown
                date={response ? response?.docs[0]?.get("date") : timer}
                // date={timer}
                onComplete={() => {
                  countTimer = true;
                  nextQuestion();
                }}
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
