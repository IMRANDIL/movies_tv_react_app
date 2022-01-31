import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleContent from '../../components/singleContent/SingleContent';
import './Trending.css';
import CustomPagination from '../../components/CustomPagination/CustomPagination';

function Trending() {


    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);


    const fetchTrending = async () => {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        setContent(data.results)
    }



    useEffect(() => {
        fetchTrending()
    }, [page])








    return <div>
        <span className='pageTitle'>Trending</span>
        <div className='trending'>
            {
                content && content.map(({ id, poster_path, title, name, first_air_date, release_date, media_type, vote_average }) => {
                    return (
                        <SingleContent key={id} id={id} poster={poster_path} title={title || name} date={first_air_date || release_date} media_type={media_type} vote_average={vote_average} />
                    )
                })
            }
        </div>
        <CustomPagination setPage={setPage} />
    </div>;
}

export default Trending;
