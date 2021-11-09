import Link from "next/link";

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center space-x-10  mt-16 mb-16 md:mb-12">
      <img
        width={200}
        height={200}
        alt={`Cover Image`}
        className="hover:shadow-medium transition-shadow duration-200"
        src={"/Logo.png"}
      />
      <div>
        <h1 className="text-2xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
          CodeChef PCCOE Chapter
        </h1>
        <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
          Let Us Help You To get Started
        </h4>
      </div>

      <div className="pb-6 space-x-6 flex md:pt-0 pt-5 lg:flex-row items-center place-content-center">
        <a href="https://www.instagram.com/pccoe.codechef.chapter/">
          <img src="/instagram.svg" alt="instagram" className="w-6 h-6" />
        </a>
        <a href="https://www.linkedin.com/company/codechef-pccoe-chapter">
          <img src="/linkedin.svg" alt="linkedIn" className="w-6 h-6" />
        </a>
        <a href="https://www.facebook.com/pccoe.codechef.chapter/">
          <img src="/facebook-logo.svg" alt="facebook" className="w-6 h-6" />
        </a>
        <a href="https://twitter.com/CodechefPccoe">
          <img src="/twitter.svg" alt="twitter" className="w-6 h-6" />
        </a>
        <Link href="/register">
          <h2 className="font-bold text-base text-blue-400 cursor-pointer">
            Take Quiz
          </h2>
        </Link>
      </div>
    </section>
  );
}
