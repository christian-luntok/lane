/** @type {import('next').NextConfig} */

const { createSecureHeaders } = require("next-secure-headers");
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    experimental: {
        appDir: true
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")]
    },
    images: {
        formats: ["image/avif", "image/webp"]
    },
    env: {
        siteTitle: "Avenue Labs - After-hours digital playground",
        siteDescription:
            "Avenue Labs serves as my digital playground outside of regular work hours, where I publish content, develop apps, and explore new technologies. It's a personal space on the internet curated by Christian Luntok",
        siteKeywords:
            "Digital Playground, Christian Luntok, cjluntok, Develop Apps, Explore technologies",
        siteUrl: "https://avenuelabs.co/",
        siteImagePreviewUrl: "/images/avenue-labs.png",
        twitterHandle: "@your_handle"
    },
    headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    ...createSecureHeaders(),
                    // HSTS Preload: https://hstspreload.org/
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload"
                    }
                ]
            }
        ];
    }
};

module.exports = nextConfig;
