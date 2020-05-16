import React, { useEffect, useState } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import './style';

interface IProps {
    urls: string[]
}

export default ({ urls }: IProps) => {
    const [postWidth, setPostWidth] = useState<number>(0);

    const getPostWidth = () => {
        const parent = document.getElementById('container');

        if (parent) {
            setPostWidth(Math.floor(parent.offsetWidth));
        }
    };

    useEffect(() => {
        getPostWidth();

        window.addEventListener('resize', getPostWidth);

        return window.removeEventListener('resize', getPostWidth);
    }, []);

    return (
        <div data-component="PostsGrid" id="container">
            {postWidth > 0 && urls.map(url => (
                <div key={url} className="item" style={{ width: postWidth }}>
                    <InstagramEmbed
                        url={url}
                        maxWidth={postWidth}
                        hideCaption={false}
                        containerTagName="div"
                        protocol=""
                        injectScript
                        onLoading={() => {}}
                        onSuccess={() => {}}
                        onAfterRender={() => {}}
                        onFailure={() => {}}
                    />
                </div>
            ))}
        </div>
    );
};
