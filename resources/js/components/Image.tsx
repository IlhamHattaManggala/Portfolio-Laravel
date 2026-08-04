import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fill?: boolean;
    sizes?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className, fill, sizes, ...props }) => {
    const style: React.CSSProperties = fill ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: 'cover'
    } : {};

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={{ ...style, ...props.style }}
            {...props}
        />
    );
};

export default Image;
