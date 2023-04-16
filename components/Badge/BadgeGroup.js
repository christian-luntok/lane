import Link from "next/link";
import { SectionContainer } from "@components/Section/";
import { getTextAlign } from "@utils/helper";

export const BadgeGroup = ({ alignment, link, children, className }) => {
    const Element = link ? Link : "div";
    const href =
        typeof link === "string" ? link : link?.href != null ? link.href : "";
    const alignClass = getTextAlign(alignment);

    return (
        <SectionContainer className="badge-group inline-flex text-sm w-auto relative">
            <Element
                href={href}
                className={`badge-group--container w-auto items-center rounded-full border border-neutral-300 bg-white px-1 py-[2px] font-medium text-primary-500 inline-flex ${
                    link
                        ? "badge-group--link transition-colors duration-300"
                        : ""
                } ${alignClass ? alignClass : ""} ${className && className}`}
            >
                {children}
            </Element>
        </SectionContainer>
    );
};
