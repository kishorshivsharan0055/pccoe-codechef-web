import React from "react";
import Link from "next/link";
import Footer from "../components/footer";

interface codeofiestaProps {}

export const codeofiesta: React.FC<codeofiestaProps> = ({}) => {
  return (
    <div>
      <section className="w-full bg-white">
        <div
          className="
  relative
  items-center
  w-full
  px-5
  py-12
  mx-auto
  md:px-12
  lg:px-16
  max-w-7xl
  lg:py-24
"
        >
          <div className="flex w-full mx-auto text-left">
            <div className="relative inline-flex items-center mx-auto align-middle">
              <div className="text-center">
                <h1
                  className="
          max-w-5xl
          text-2xl
          font-bold
          leading-none
          tracking-tighter
          text-neutral-600
          md:text-5xl
          lg:text-6xl lg:max-w-7xl
        "
                >
                  {" "}
                  Thank You For Participating In{" "}
                  <br className="hidden lg:block" /> Code-O-Fiesta - Round 1{" "}
                </h1>
                <p
                  className="
          max-w-xl
          mx-auto
          mt-8
          text-base
          leading-relaxed
          text-gray-300
        "
                >
                  {" "}
                  We Will get back to you once you are shortlisted for the next
                  round, till then stay tuned. Results will be declared on
                  discord.{" "}
                </p>
                <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
                  <div className="mt-3 rounded-lg sm:mt-0">
                    <Link href="https://discord.com/invite/bskjn2qcRm">
                      <button
                        className="
              items-center
              block
              px-5
              py-4
              text-base
              font-medium
              text-center text-white
              transition
              duration-500
              ease-in-out
              transform
              bg-blue-400
              lg:px-10
              rounded-xl
              hover:bg-blue-500
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-blue-500
            "
                      >
                        {" "}
                        Discord Server{" "}
                      </button>
                    </Link>
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

export default codeofiesta;
