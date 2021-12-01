import React, { useState } from "react";
import axios from "axios";

const SingleRecipe = ({ recipe, returnFromSingleRecipeView }) => {
    const [isEdit, setIsEdit] = useState(false);
    console.log("recipe: " + recipe._id);

    const deleteRecipe = async () => {
        const result = await axios.get(`/api/recipe/delete/${recipe._id}`);
        returnFromSingleRecipeView({});
    }

    const addSubmit = async (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const description = event.target[1].value;
        const ingredients = event.target[2].value;

        console.log("New recipe: " + name + " "+ description + " " + ingredients);
        let ingredientsArray = [];
        if(ingredients !== null && ingredients !== ""){
            ingredientsArray = ingredients.split(",");
        }

        const result = await axios.post(`/api/recipe/add`,{
            name: name,
            description: description,
            ingredients: ingredientsArray
        });

        returnFromSingleRecipeView({});
    }

    const editSubmit = async (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const description = event.target[1].value;
        const ingredients = event.target[2].value;

        console.log("Edit recipe: " + name + " "+ description + " " + ingredients);
        let ingredientsArray = [];
        if(ingredients !== null && ingredients !== ""){
            ingredientsArray = ingredients.split(",");
        }

        recipe.name = name;
        recipe.description = description;
        recipe.ingredients = ingredients;

        const result = await axios.post(`/api/recipe/edit`, {
            recipe: recipe
        });
        if(result.data.result !== undefined){
            recipe = recipe;
        }
        setIsEdit(false);
    }

    console.log(isEdit);
    if (isEdit === true) {
        return (
            <form onSubmit={editSubmit}>
                <input placeholder="Name" type="text" defaultValue={recipe.name}/>
                <input placeholder="Description" type="text" defaultValue={recipe.description}/>
                <input placeholder="Ingredients" type="text" defaultValue={recipe.ingredients.toString()}/>
                <input type="submit" value="Submit" />
            </form>
        );
    } else if (recipe._id !== undefined){
        return (
            <div>
                <div>{recipe._id}</div>
                <div>{recipe.name}</div>
                <div>{recipe.description}</div>
                <div>{recipe.ingredients.toString()}</div>
                <div>{recipe.createdAt}</div>
                <input type="button" onClick={() => returnFromSingleRecipeView({})} value="return"/>
                <input type="button" onClick={deleteRecipe} value="delete"/>
                <input type="button" onClick={() => setIsEdit(true)} value="edit"/>
            </div>
        );
    } else {
        return (
            <form onSubmit={addSubmit}>
                <input placeholder="Name" type="text"/>
                <input placeholder="Description" type="text"/>
                <input placeholder="Ingredients (coma seperated)" type="text"/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default SingleRecipe;