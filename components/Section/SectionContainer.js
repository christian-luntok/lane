export const SectionContainer = ({ children, className = "" }) => {
    return (
        <section className={`${className && className}`}>{children}</section>
    );
};
