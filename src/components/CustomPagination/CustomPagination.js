

import { Pagination } from '@mui/material';
import React from 'react';
import './Pagination.css';








function CustomPagination({ setPage, numOfPages = 10 }) {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0)
    }
    return <div className='pagination'>

        <Pagination count={numOfPages} onChange={(e) => handlePageChange(e.target.textContent)} color='primary' />


    </div>;
}

export default CustomPagination;
