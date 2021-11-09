import Link from "next/link";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../utils/firebaseClient";

const Navbar: React.FC<any> = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [user, loading, error] = useAuthState(firebase.auth());

  const navbar = useRef(null);
  return (
    <>
      <div
        ref={navbar}
        className={`fixed select-none z-40 w-full h-20 xl:h-24 flex flex-col justify-start xl:flex-row xl:items-center shadow-lg bg-white px-12 md:px-20 lg:px-32 overflow-hidden ${
          navbarOpen ? `nav-bar-open` : `nav-bar`
        }`}
      >
        <div className="my-2 flex items-center xl:flex-grow">
          <Link href="/">
            <a className="font-semibold text-2xl md:text-4xl flex-grow">
              Codechef Pccoe Chapter
            </a>
          </Link>
        </div>
        <div
          className={`xl:mt-0 ${
            navbarOpen ? `flex` : `hidden xl:flex`
          } space-y-3 xl:space-y-0 flex-col xl:flex-row xl:space-x-8`}
        >
          <a className="flex items-center space-x-3">
            {!loading && user?.photoURL && (
              <img src={user?.photoURL} alt="User" width={20} height={20} />
            )}
            <h2 className="font-normal text-md md:text-lg">
              {!loading && user?.displayName && user?.displayName}
            </h2>
          </a>
        </div>
      </div>
      <style jsx>{`
        .nav-icon {
          margin: 1em;
          width: 24px;
          color: black;
          cursor: pointer;
        }

        .nav-icon:after,
        .nav-icon:before,
        .nav-icon div {
          background-color: #000;
          content: "";
          display: block;
          height: 2px;
          margin: 6px 0 0px 0;
          transition: all 0.2s ease-in-out;
        }

        .nav-bar {
          transition: all 0.3s ease-in-out;
        }

        .nav-bar-open {
          transition: all 0.25s ease-in-out;
          height: 15rem;
        }

        .nav-open:before {
          transform: translateY(8px) rotate(135deg);
        }

        .nav-open:after {
          transform: translateY(-8px) rotate(-135deg);
        }

        .nav-open div {
          transform: scale(0);
        }
      `}</style>
    </>
  );
};

export default Navbar;
