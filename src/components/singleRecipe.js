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
                <input class="btn" type="submit" value="Submit" />
            </form>
        );
    } else if (recipe._id !== undefined){
        return (
            <div>
                <ul>
                    <li class="list-group-item">ID: {recipe._id}</li>
                    <li class="list-group-item">Name: {recipe.name}</li>
                    <li class="list-group-item">Description: {recipe.description}</li>
                    <li class="list-group-item">Ingredients: {recipe.ingredients.toString()}</li>
                    <li class="list-group-item">Created TS: {recipe.createdAt}</li>
                </ul>
                <input class="btn" type="button" onClick={() => returnFromSingleRecipeView({})} value="Return to list"/>
                <input class="btn" type="button" onClick={deleteRecipe} value="Delete recipe"/>
                <input class="btn" type="button" onClick={() => setIsEdit(true)} value="Edit recipe"/>
            </div>
        );
    } else {
        return (
            <form onSubmit={addSubmit}>
                <input placeholder="Name" type="text"/>
                <input placeholder="Description" type="text"/>
                <input placeholder="Ingredients (coma seperated)" type="text"/>
                <input class="btn" type="submit" value="Submit" />
            </form>
        );
    }
}

export default SingleRecipe;