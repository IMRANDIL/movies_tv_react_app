import { Chip } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {


    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((gen) => gen.id !== genre.id));
        setPage(1)
    }



    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((select) => select.id !== genre.id));
        setGenres([...genres, genre]);
        setPage(1)
    }




    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setGenres(data.genres);

    }


    useEffect(() => {

        fetchGenres()
        return () => {
            setGenres({})
        }
        // eslint-disable-next-line
    }, [])

    return <div style={{ padding: '6px 0' }}>

        {selectedGenres && selectedGenres.map((genre) => {
            return (
                <Chip label={genre.name} style={{ margin: 2 }} clickable size='small' key={genre.id} color='primary' onDelete={() => handleRemove(genre)} />
            )
        })}


        {genres && genres.map((genre) => {
            return (
                <Chip label={genre.name} style={{ margin: 2 }} clickable size='small' key={genre.id} onClick={() => handleAdd(genre)} />
            )
        })}
    </div>;
};

export default Genres;
