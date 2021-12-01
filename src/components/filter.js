import React from "react";

const Filter = ({ updateFilters }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        updateFilters(event.target[0].value, event.target[1].value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input class="recepie-name" placeholder="Name" type="text"/>
            <input class="ing" placeholder="Ingredient" type="text"/>
            <input class="submit btn"type="submit" value="Submit" />
        </form>
    );
}

export default Filter