import { SectionContainer } from "@components/Section";

export const PageTitle = ({
    children,
    className = "",
    headingClassName = ""
}) => {
    return (
        <SectionContainer
            className={`page-title--content max-w-[54rem] ${
                className && className
            }`}
        >
            <h1
                className={`text-4xl lg:text-3xl font-medium leading-8 lg:leading-10 tracking-tight lg:tracking-tighter ${
                    headingClassName && headingClassName
                }`}
            >
                {children}
            </h1>
        </SectionContainer>
    );
};
