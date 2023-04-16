import { SectionContainer } from "@components/Section";
import Link from "next/link";
import clsx from "clsx";

const CardType = {
    default: "bg-neutral-100 -mt-1 mb-1 -ml-1 card-clip",
    bordered: "border-[1px] border-neutral-200 text-primary-500 p-8"
};

export const Card = ({
    link = "",
    className = "",
    children,
    target = "",
    type = "default"
}) => {
    const Element = link ? Link : "div";
    const href =
        typeof link === "string" ? link : link?.href != null ? link.href : "";
    return (
        <Element
            href={href}
            target={link ? target : "_self"}
            className={clsx(
                "card text-black/60 block aspect-square relative transition-all duration-300",
                {
                    [CardType.default]: type === "default",
                    [CardType.bordered]: type === "bordered"
                },
                className
            )}
        >
            {children}
        </Element>
    );
};
