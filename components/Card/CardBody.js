export const CardBody = ({ children, className = "" }) => {
    return (
        <div className={`card--body h-100 w-100 ${className && className}`}>
            {children}
        </div>
    );
};
