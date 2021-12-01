const logger = require("../init/logger-init")
const Recipe = require("../models/recipe")

async function fetch(id){
    logger.info(`Fetch recipe, id:${id}`);

    const result = await Recipe.findById(id).exec();

    logger.debug(`Fetched recipe:${result}`);
    if(!result){
        logger.error(`Error while fetching recipe`);
        return null;
    }

    return result;
}

async function fetchPaginatedFilteredList(pageNo, pageSize, nameFilter, ingredientFilter){
    logger.info(`Fetch filtered recipes, pageNo:${pageNo}, pageSize:${pageSize}, nameFilter:${nameFilter}, ingredientFilter:${ingredientFilter}\n`);

    const pageNoInt = parseInt(pageNo);
    const pageSizeInt = parseInt(pageSize);
    const filter = new Object();
    if(nameFilter){ filter.name = {$regex: nameFilter}; }
    if(ingredientFilter){ filter.ingredients = {$all : [`${ingredientFilter}`]}; }

    const skip = (pageNoInt - 1) * pageSizeInt;
    const count = await Recipe.countDocuments(filter).exec();
    if(count <= skip){
        return null;
    }
    logger.debug(`${count}`);

    const result = await Recipe.find(filter).skip(skip).limit(pageSizeInt).exec();

    logger.debug(`${result}`)
    return {result: result, count: count};
}

async function addRecipe(name, description, ingredients){
    logger.info(`Creating new recipe, name:${name}, description:${description}`);

    const existingRecipe = await Recipe.find({name: name}).exec();
    if(existingRecipe.length > 0){
        logger.warn(`Recipe with the same name exists`);
        return null;
    }

    const result = await Recipe.create({
        name: name,
        description: description,
        ingredients: ingredients
    });

    if(!result){
        logger.error(`Error while creating recipe`);
        return null;
    }

    logger.info(`Created recipe:${result}`);
    return result;
}

async function editRecipe(editedRecipe){
    logger.info(`Editing recipe, name:${editedRecipe.name}, id=${editedRecipe._id}`);

    const result = await Recipe.findByIdAndUpdate(editedRecipe._id, editedRecipe, { new: true }).exec();

    if(!result){
        logger.error(`Recipe with ID not found: ${id}`);
        return null;
    }

    logger.debug(`${result}`)
    return result;
}

async function deleteRecipe(id){
    logger.info(`Deleting recipe, id:${id}`);

    const result = await Recipe.findByIdAndDelete(id).exec();

    if(!result){
        logger.error(`Recipe with ID not found: ${id}`);
        return null;
    }

    logger.debug(`${result}`)
    return result;
}

module.exports = {fetch, addRecipe, deleteRecipe, editRecipe, fetchPaginatedFilteredList};