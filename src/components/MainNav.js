import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';

//styles..




export default function SimpleBottomNavigation() {

    const [value, setValue] = React.useState(0);

    return (
        <Box style={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            zIndex: 100

        }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{ backgroundColor: '#2d313a', }}
            >
                <BottomNavigationAction style={{ color: 'white' }} label="Trending" icon={<WhatshotIcon />} />
                <BottomNavigationAction style={{ color: 'white' }} label="Movies" icon={<MovieIcon />} />
                <BottomNavigationAction style={{ color: 'white' }} label="TV Series" icon={<TvIcon />} />
                <BottomNavigationAction style={{ color: 'white' }} label="Search" icon={<SearchIcon />} />
            </BottomNavigation>
        </Box >
    );
}
