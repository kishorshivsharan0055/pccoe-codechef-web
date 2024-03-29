import Link from "next/link";
import CoverImage from "./cover-image";
import Date from "./date";

export default function HeroPost({ title, coverImage, date, excerpt, slug }) {
  return (
    <section>
      <div className="mb-8 md:mb-16 mt-20">
        <h1 className="text-2xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 mb-4">
          Learning Resources (Current Topic)
        </h1>
        <CoverImage slug={slug} title={title} image={coverImage} />
      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-2xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-base">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        </div>
      </div>
    </section>
  );
}
