import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomPagination from '../../components/CustomPagination/CustomPagination';
import SingleContent from '../../components/singleContent/SingleContent';
import Genres from '../../components/Genres';
import useGenres from '../../Hooks/useGenre';


function Movies() {

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres)

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
        setContent(data.results);
        setNumOfPages(data.total_pages)
    }


    useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line
    }, [page, genreforURL])




    return <div>
        <span className='pageTitle'>Movies</span>
        <Genres
            type='movie'
            selectedGenres={selectedGenres}
            genres={genres}
            setGenres={setGenres}
            setSelectedGenres={setSelectedGenres}
            setPage={setPage}
        />
        <div className='trending'>
            {
                content && content.map(({ id, poster_path, title, name, first_air_date, release_date, vote_average }) => {
                    return (
                        <SingleContent key={id} id={id} poster={poster_path} title={title || name} date={first_air_date || release_date} media_type='movie' vote_average={vote_average} />
                    )
                })
            }
        </div>
        {numOfPages > 1 && (
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />)}
    </div>;
}

export default Movies;
