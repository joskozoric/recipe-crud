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
            <ul>
                {recipes.map(recipe => (
                    <li class="list-group-item" key={recipe._id} onClick={() => onClick(recipe._id)} className="list-group-item">{recipe.name}</li>
                ))}
            </ul>
        );
    } else {
        return (
            <div class="noItems">No items</div>
        );
    }

}

export default ItemContainer