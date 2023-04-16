import Image from "next/image";
import clsx from "clsx";

const ImageSizes = {
    medium: {},
    default: {},
    small: {}
};

export const CardImage = ({
    src,
    className = "",
    width,
    height,
    imageClassName = "",
    alt
}) => {
    return (
        <div className={`card--image ${className && className}`}>
            <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                loading="lazy"
                className={`object-cover ${imageClassName && imageClassName}`}
            />
        </div>
    );
};
