import React from 'react';
import './SingleContent.css';

import { img_300, unavailable } from '../../config/config'



function SingleContent({ id, poster, title, name, date, media_type, vote_average }) {
    return <div className='media'>
        <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
        <b className='title'>{title}</b>
        <span className='subtitle'>
            {media_type === 'tv' ? 'TV Series' : 'Movie'}
            <span className='subtitle'>{date}</span>
        </span>
    </div>;
}

export default SingleContent;
