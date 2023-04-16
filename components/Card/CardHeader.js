import { Icon } from "@iconify/react";
import clsx from "clsx";

const TitleType = {
    default: "",
    badge: "inline-flex items-center gap-3"
};

export const CardHeader = ({
    children,
    className = "",
    hasArrow = false,
    hasBadge
}) => {
    // Has badge should chage styling for h2
    return (
        <div className="card--header flex flex-row w-auto items-center justify-between">
            <h2
                className={clsx(
                    "font-medium text-primary-900 mb-0 text-3xl leading-9 tracking-tighter",
                    {
                        [TitleType.badge]: hasBadge == true,
                        [TitleType.default]: hasBadge == false
                    },
                    className
                )}
            >
                {children}
            </h2>
            {hasArrow && (
                <Icon
                    icon="material-symbols:arrow-outward"
                    className="ml-2 h-6 w-auto"
                />
            )}
        </div>
    );
};
