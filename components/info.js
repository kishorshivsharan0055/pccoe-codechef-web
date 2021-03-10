export default function Info() {
  return (
    <section className="flex-col md:flex-col flex items-center mt-16 mb-16 md:mb-12">
      <p className="text-justify mb-10">
        CodeChef PCCOE Chapter is the community for the students of Pimpri
        Chinchwad College of Engineering, Pune. Our vision and goal is to create
        competitive coding culture in our campus and to inspire more people to
        participate in coding contest.
      </p>

      <img
        width={2000}
        height={1000}
        alt={`Cover Image`}
        className="hover:shadow-medium transition-shadow duration-200"
        src={"/banner.png"}
      />
    </section>
  );
}
