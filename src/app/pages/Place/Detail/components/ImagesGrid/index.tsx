import React from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import './style';

interface IProps {
    images: string[]
}

export default ({ images }: IProps) => {
    console.log(images.map(image => ({ url: image })));

    return (
        <div data-component="ImagesGrid">
            <SimpleImageSlider
                width="calc(100vw - 24px)"
                height="calc(62.5vw - 24px)"
                images={images.map(image => ({ url: image }))}
                showBullets={false}
            />
        </div>
    );
};
