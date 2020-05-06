import React from 'react';
import './style';

interface IProps {
    images: string[]
}

export default ({ images }: IProps) => {
    return (
        <div data-component="ImagesGrid">
            {images.map(image => (
                <img key={image} className="image" src={image} alt=""/>
            ))}
        </div>
    );
};
