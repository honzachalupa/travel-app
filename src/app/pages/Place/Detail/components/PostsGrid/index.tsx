import React, { useEffect, useState } from 'react';
import './style';
import InstagramEmbed from 'react-instagram-embed';

interface IProps {
    urls: string[]
}

export default ({ urls }: IProps) => {
    const [postWidth, setPostWidth] = useState<number>(200);

    const getPostWidth = () => {
        const parent = document.getElementById('container');

        if (parent) {
            setPostWidth(Math.round((parent.offsetWidth) / 2));
        }
    };

    useEffect(() => {
        window.addEventListener('resize', getPostWidth);

        return window.removeEventListener('resize', getPostWidth);
    }, []);

    return (
        <div data-component="PostsGrid" id="container">
            {postWidth > 0 && urls.map(url => (
                <div key={url} className="post" style={{ width: postWidth }}>
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
