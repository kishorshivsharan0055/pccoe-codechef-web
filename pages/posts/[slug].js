import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import PostTitle from "../../components/post-title";
import SectionSeparator from "../../components/section-separator";
import { postQuery, postSlugsQuery } from "../../lib/queries";
import { urlForImage, usePreviewSubscription } from "../../lib/sanity";
import {
  getClient,
  overlayDrafts,
  sanityClient,
} from "../../lib/sanity.server";

export default function Post({ data = {}, preview }) {
  const router = useRouter();

  const slug = data?.post?.slug;
  const {
    data: { post, morePosts },
  } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  });

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.title} | #HeadStartCP</title>
                {post.coverImage && (
                  <meta
                    key="ogImage"
                    property="og:image"
                    content={urlForImage(post.coverImage)
                      .width(1200)
                      .height(627)
                      .fit("crop")
                      .url()}
                  />
                )}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const { post, morePosts } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      data: {
        post,
        morePosts: overlayDrafts(morePosts),
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
