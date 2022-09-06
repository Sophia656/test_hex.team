import React from 'react';
import Button from '../UI/button/Button';

const Pagination = ({allPages, page, setPage, setChangePage}) => {

    const pagesArray = []

    for (let i = 1; i <= allPages; i++) {
        pagesArray.push(i)
    }

    const handleChangePage = (page) => {
        setPage(page)
        setChangePage(true)
    }

    return (
        <div>
            {pagesArray.map(p =>
                <Button 
                    onClick={() => handleChangePage(p)}
                    key={p}
                >
                {p}
                </Button>  
            )}
      </div>
    );
};

export default Pagination;