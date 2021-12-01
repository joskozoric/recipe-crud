import React from "react";

const Pagination = ({ currentPage, noPages, changePage }) => {
    const onCLick = async (event) => {
        console.log("Change page to: " + event.target.id);
        changePage(event.target.id);
    }

    const pageButtons = [];
    for(var i = 0; i < noPages; i++){
        pageButtons.push(<button class={currentPage == i + 1 || "disabled"} type="button" id={i + 1} onClick={onCLick}> {i + 1} </button>);
    }

    return (
        <ul class="pagination">
            {pageButtons}
        </ul>
    );
}

export default Pagination;