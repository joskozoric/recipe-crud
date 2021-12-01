import React from "react";
import axios from "axios";

import ItemContainer from "./components/itemContainer";
import Filter        from "./components/filter";
import Pagination    from "./components/pagination";
import SingleRecipe  from "./components/singleRecipe";
import './styles.css'; 

import { useEffect, useState } from 'react';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState({});
    const [loading, setLoading] = useState(false);

    // Paging
    const [noPages, setNoPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Filter
    const [nameFilter, setNameFilter] = useState("");
    const [ingredientFilter, setIngredientFilter] = useState("");

    useEffect(() => {
        // If main view, fetch recipes
        if(Object.keys(currentRecipe).length === 0){
            fetchRecipes();
        }
    }, [currentPage, nameFilter, ingredientFilter, currentRecipe]);

    const selectRecipe = (selectedRecipeId) =>{
        const selectedRecipe = recipes.find(recipe => recipe._id == selectedRecipeId);
        if(selectedRecipe === undefined){
            console.log("Cannot find recipe with id: " + selectedRecipeId);
            return;
        }
        setCurrentRecipe(selectedRecipe);
    }

    const updateFilters = async (nameFilterParam, ingredientFilterParam) => {
        console.log("Updated filters : " + nameFilterParam + " " + ingredientFilterParam);
        setNameFilter(nameFilterParam);
        setIngredientFilter(ingredientFilterParam);
        setCurrentPage(1);
    }

    const newRecipe = () => {
        setCurrentRecipe({
            name: "",
            description: "",
            ingredients: []
        });
    }

    const fetchRecipes = async () => {
        setLoading(true);
        const result = await axios.post('/api/recipe', {
            pageSize: 5,
            pageNo: currentPage || 1,
            nameFilter: nameFilter || "",
            ingredientFilter: ingredientFilter || ""
        });

        if(result.data == null){
            console.log("Empty response");
            setLoading(false);
            setRecipes([]);
            return;
        }
        setRecipes(result.data.result);
        const recipeCount = parseInt(result.data.count);
        const newNoPages = Math.ceil(recipeCount / pageSize);
        if(newNoPages != noPages){
            setNoPages(newNoPages);
        }
        setLoading(false);
    }

    if(Object.keys(currentRecipe).length === 0){
        return (
            <body class="container">
                <Filter loading={loading} updateFilters={updateFilters}></Filter>
                <ItemContainer recipes={recipes} loading={loading} selectRecipe={selectRecipe}></ItemContainer>
                <input class="btn" type="button" value="New recipe" onClick={newRecipe}></input>
                <Pagination currentPage={currentPage} noPages={noPages} changePage={setCurrentPage}></Pagination>
            </body>
        );
    } else {
        return (
            <body class="container">
                <SingleRecipe recipe={currentRecipe} returnFromSingleRecipeView={setCurrentRecipe}/>
            </body>
        );
    }

}

export default App;