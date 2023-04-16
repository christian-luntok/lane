import { SectionContainer } from "@components/Section";
import { Layout } from "@components/Layout";
import Link from "next/link";
import Image from "next/image";
import SEO from "@components/SEO/SEO";
import avenueIcon from "../public/icons/avenue-icon.svg";
import articooleIcon from "../public/icons/articoole-icon.svg";
import pathwayIcon from "../public/icons/pathway-icon.png";
import profilePicture from "../public/images/picture.png";
import { PageTitle } from "@components/Title";
import {
    Card,
    CardBody,
    CardGroup,
    CardHeader,
    CardImage
} from "@components/Card";
import { BadgeGroup, BadgeMessage } from "@components/Badge";
import { getAllPosts } from "./api/blog/getBlogs";
import { MotionBTTContainer } from "@components/Motion";

const projectData = [
    {
        id: "1",
        title: "Avenue Labs",
        logo: avenueIcon,
        link: "https://avenuelabs.co/",
        content: "After-hours digital playground."
    },
    {
        id: "2",
        title: "Pathway",
        link: "https://pathway.avenuelabs.co/",
        logo: pathwayIcon,
        content: " A NextJS Tailwind CSS SAAS Landing Page."
    },
    {
        id: "3",
        title: "Articoole",
        logo: articooleIcon,
        content: "Making content creation a breeze.",
        badgeContent: "On Going"
    }
];

export default function Home({ posts }) {
    return (
        <Layout>
            <SEO
                title="Lane - Avenue Labs"
                description="Lane - A personal portfolio landing template for developers and designers. Made by Avenue Labs"
            />
            <div className="main-wrapper wrap-sm grid gap-16 px-8 md:gap-24 lg:gap-32 mx-auto">
                {/* Header / Hero */}
                <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                    <SectionContainer className="hero--container flex flex-col gap-8 mt-32">
                        <Image
                            src={profilePicture}
                            className=" rounded-full bg-neutral-100 object-cover"
                            width={128}
                            height={128}
                            alt="Lane - Avenue Labs"
                        />
                        <div className="content-container">
                            <PageTitle
                                className="mb-8 lg:mb-4"
                                headingClassName="mb-0"
                            >
                                I&apos;m Christian - developer and designer
                            </PageTitle>
                            <div className="content text-3xl md:text-3xl font-medium leading-8 lg:leading-10 tracking-tight lg:tracking-tighter text-neutral-500 ">
                                I love building stuff! With a years of
                                experience, I know my way around creating
                                awesome websites.
                            </div>
                        </div>
                    </SectionContainer>
                </MotionBTTContainer>
                {/* Card Containers */}
                <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                    <SectionContainer className="projects--container">
                        <h2 className="font-medium text-h4 text-neutral-500 my-4 leading-8 tracking-tighter">
                            Products
                        </h2>
                        <CardGroup className="grid scroll-m-24 gap-5 grid-cols-1 md:grid-cols-2 w-full">
                            {projectData.map((project) => (
                                <Card
                                    key={project.id}
                                    className="col-span-1"
                                    link={project.link}
                                    target="_blank"
                                >
                                    {!!project.badgeContent && (
                                        <BadgeGroup
                                            className="mb-0 m-6"
                                            alignment="left"
                                        >
                                            <BadgeMessage>
                                                On Going
                                            </BadgeMessage>
                                        </BadgeGroup>
                                    )}
                                    <CardBody>
                                        <CardImage
                                            src={project.logo}
                                            alt="Articoole Banner"
                                            imageClassName="absolute top-0 right-0 m-6 p-4 bg-white rounded-3xl"
                                            width={80}
                                            height={80}
                                        />
                                        <div className="card-content absolute bottom-8 left-6 right-6">
                                            <CardHeader className="">
                                                {project.title}
                                            </CardHeader>
                                            <div className="content break-words  text-3xl font-medium leading-10 tracking-tight lg:tracking-tighter text-neutral-500 ">
                                                <p>{project.content}</p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </CardGroup>
                    </SectionContainer>
                </MotionBTTContainer>
                {/* Blog Container */}

                <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                    <SectionContainer className="blogs--container">
                        <h2 className="font-medium text-h4 text-neutral-500 my-4 leading-8 tracking-tighter">
                            Blogs
                        </h2>
                        <ul className="list-none space-y-5">
                            {posts.map((post) => (
                                <li
                                    key={post.title}
                                    className="flex flex-col gap-1"
                                >
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="block w-full card-clip p-8 no-underline sm:flex-row sm:gap-8 bg-neutral-100 rounded-[40px] transition-all duration-300"
                                    >
                                        <span className="grid flex-1 gap-1">
                                            <span className="text-neutral-900 line-clamp-1 md:inline-flex items-center">
                                                <span className="inline-block font-medium">
                                                    {post.title}
                                                </span>
                                                <span className="md:mb-0 my-2 md:my-0 md:ml-2 text-sm w-max md:w-auto items-center rounded-full border border-neutral-300 bg-white px-1 py-[2px] font-medium text-primary-500 block md:inline-flex">
                                                    <span className="px-2">
                                                        {post.date}
                                                    </span>
                                                </span>
                                            </span>
                                            <span className="text-neutral-500 line-clamp-2 ">
                                                {post.excerpt}
                                            </span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </SectionContainer>
                </MotionBTTContainer>
            </div>
        </Layout>
    );
}

export const getServerSideProps = async () => {
    const allPosts = getAllPosts([
        "title",
        "date",
        "slug",
        "author",
        "coverImage",
        "excerpt"
    ]);

    const formatedPosts = {};

    allPosts.forEach((post, index) => {
        const formattedDate = new Date(post.date).toISOString().split("T")[0];

        formatedPosts[index] = { ...post, date: formattedDate }; // assign formatted post object to the object using post ID as the key
    });

    // Convert object to an array
    const sortedPosts = Object.values(formatedPosts);

    // Sort posts by date in descending order
    sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
        props: { posts: sortedPosts }
    };
};
