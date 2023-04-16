import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Layout } from "@components/Layout/Layout";
import { getPostBySlug, getAllPosts } from "../api/blog/getBlogs";
import markdownToHtml from "@utils/markdownToHtml";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import SEO from "@components/SEO/SEO";
import { calculateReadingTim } from "@utils/calculateReadingTime";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { MotionBTTContainer } from "@components/Motion";

export default function Post({ post }) {
    const router = useRouter();
    const title = `${post.title} - Avenue Labs`;
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <Layout>
            <SEO title={title} description={post.excerpt} />
            <SectionContainer className="wrap wrap-px grid gap-8 px-4 sm:gap-16 sm:px-8">
                {router.isFallback ? (
                    <PageTitle className="wrap wrap-px">Loading…</PageTitle>
                ) : (
                    <div className="flex mt-32">
                        <div className="content--container flex-1 md:pr-6">
                            <article className="mx-auto prose prose-neutral prose-headings:font-medium prose-h2:scroll-mt-4 prose-h3:scroll-mt-4 prose-h4:scroll-mt-4 prose-h5:scroll-mt-4 prose-h6:scroll-mt-4">
                                <MotionBTTContainer
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <Link
                                        href="/"
                                        className="flex no-underline mb-16"
                                    >
                                        <Icon
                                            icon="ph:arrow-left-light"
                                            className="w-6 h-6 mr-4"
                                        />
                                        Back to home
                                    </Link>
                                </MotionBTTContainer>
                                <MotionBTTContainer
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <div className="post--title">
                                        <h1 className="text-2xl md:text-3xl">
                                            {post.title}
                                        </h1>
                                    </div>
                                    <div
                                        className=" prose-code:whitespace-pre-wrap prose-code:break-words prose-code:overflow-x-auto"
                                        dangerouslySetInnerHTML={{
                                            __html: post.content
                                        }}
                                    />
                                </MotionBTTContainer>
                            </article>
                        </div>
                    </div>
                )}
            </SectionContainer>
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug, [
        "title",
        "date",
        "slug",
        "content",
        "category",
        "excerpt"
    ]);

    const content = await markdownToHtml(post.content || "");

    const date = new Date(post.date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
    const readingTime = await calculateReadingTim(content);

    return {
        props: {
            post: {
                ...post,
                content,
                date,
                readingTime
            }
        }
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts(["slug"]);
    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug
                }
            };
        }),
        fallback: false
    };
}
