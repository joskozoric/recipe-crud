import React from "react";
import { useState } from 'react';

const Pagination = ({ currentPage, noPages, changePage }) => {
    const onCLick = async (event) => {
        console.log("Change page to: " + event.target.id);
        changePage(event.target.id);
    }

    const pageButtons = [];
    for(var i = 0; i < noPages; i++){
        pageButtons.push(<button disabled={currentPage == i + 1} type="button" id={i + 1} onClick={onCLick}> {i + 1} </button>);
    }

    return (
        <ul>
            {pageButtons}
        </ul>
    );
}

export default Pagination;