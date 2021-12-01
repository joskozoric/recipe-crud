import React from "react";

const Filter = ({ updateFilters }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(event.target)
        updateFilters(event.target[0].value, event.target[1].value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" type="text"/>
            <input placeholder="Ingredient" type="text"/>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default Filter