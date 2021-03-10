import { CMS_NAME, CMS_URL } from "../lib/constants";

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center  mt-16 mb-16 md:mb-12">
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
    </section>
  );
}
