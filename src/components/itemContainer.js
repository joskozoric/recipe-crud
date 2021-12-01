import React from "react";

const ItemContainer = ({ recipes, loading, selectRecipe }) => {
    if(loading){
        return <h2>Loading ...</h2>
    }

    const onClick = (id) => {
        console.log("Item clicked: " + id);
        selectRecipe(id);
    }

    if(recipes && recipes.length !== 0){
        return (
            <ul className="list-group mb-4">
                {recipes.map(recipe => (
                    <li key={recipe._id} onClick={() => onClick(recipe._id)} className="list-group-item">{recipe.name}</li>
                ))}
            </ul>
        );
    } else {
        return (
            <div>No items</div>
        );
    }

}

export default ItemContainer