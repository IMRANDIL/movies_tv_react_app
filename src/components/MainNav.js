import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{
            width: '100%', position: 'fixed', bottom: 0,
            backgroundColor: '#2d313a',
            zIndex: 100
        }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction style={{ color: '#2d313a' }} label="Trending" icon={<WhatshotIcon />} />
                <BottomNavigationAction style={{ color: '#2d313a' }} label="Movies" icon={<MovieIcon />} />
                <BottomNavigationAction style={{ color: '#2d313a' }} label="TV Series" icon={<TvIcon />} />
                <BottomNavigationAction style={{ color: '#2d313a' }} label="Search" icon={<SearchIcon />} />
            </BottomNavigation>
        </Box >
    );
}
