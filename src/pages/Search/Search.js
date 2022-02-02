import { Button, Tab, Tabs, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Search from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../components/singleContent/SingleContent';
import CustomPagination from '../../components/CustomPagination/CustomPagination';


function Seaarch() {

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();



    const fetchSearch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchText}&page=${page}&include_adult=false`);


        setContent(data.results);
        setNumOfPages(500)
    }


    useEffect(() => {

        window.scroll(0, 0);
        fetchSearch()
        // eslint-disable-next-line
    }, [type, page])



    return <div>
        <div style={{ display: 'flex', margin: '15px 0' }}>
            <TextField
                style={{ flex: 1, backgroundColor: '#2d313a' }}
                className='searchbox'
                label='Search'
                variant='filled'
                onChange={(e) => setSearchText(e.target.value)}


            />
            <Button variant='contained' style={{ marginLeft: 10 }} onClick={fetchSearch}><Search /></Button>
        </div>
        <Tabs value={type} indicatorColor='primary' textColor='primary' onChange={(event, newValue) => {
            setType(newValue);
            setPage(1)
        }} centered style={{ paddingBottom: 5 }}>

            <Tab label="Search Movies" style={{ width: '50%', color: 'white' }} />
            <Tab label="Search Tv Series" style={{ width: '50%', color: 'white' }} />

        </Tabs>


        <div className='trending'>
            {
                content && content.map(({ id, poster_path, title, name, first_air_date, release_date, vote_average }) => {
                    return (
                        <SingleContent key={id} id={id} poster={poster_path} title={title || name} date={first_air_date || release_date} media_type={type ? 'tv' : 'movie'} vote_average={vote_average} />
                    )
                })
            }
            {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {numOfPages > 1 && (
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />)}


    </div>;
}

export default Seaarch;
