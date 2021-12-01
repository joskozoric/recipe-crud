const express = require("express");
const logger = require("../init/logger-init")
const recipeService = require("../service/recipe-service")
const { param, body, validationResult } = require('express-validator')

const recipeRouter = express.Router();
  
recipeRouter.post(
    "/",
    body("pageNo").isNumeric(),
    body("pageSize").isNumeric(),
    body("ingredientFilter").isAscii().optional({checkFalsy: true}),
    body("nameFilter").isAscii().optional({checkFalsy: true}),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            logger.warn(`Invalid request format`);
            return res.json({errors: errors.array()});
        }

        const serviceResult = await recipeService.fetchPaginatedFilteredList(
            req.body.pageNo,
            req.body.pageSize,
            req.body.nameFilter,
            req.body.ingredientFilter
        );
    
        res.json(serviceResult);
});

recipeRouter.get(
    "/:id",
    param("id").isMongoId(),
     async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            logger.warn(`Invalid request format`);
            return res.json({errors: errors.array()});
        }

        const serviceResult = await recipeService.fetch(req.params.id);
        res.json({result: serviceResult});
});

recipeRouter.get(
    "/delete/:id",
    param("id").isMongoId(),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            logger.warn(`Invalid request format`);
            return res.json({errors: errors.array()});
        }

        const serviceResult = await recipeService.deleteRecipe(req.params.id);

        if(!serviceResult){
            return res.json({errors: "error while deleting recipe"});
        }
        
        return res.json({result: serviceResult});
});

recipeRouter.post(
    "/add", 
    body("name").isAscii(),
    body("description").isAscii(),
    body("ingredients").isArray({min: 1}),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            logger.warn(`Invalid request format`);
            return res.json({errors: errors.array()});
        }
    
        const serviceResult = await recipeService.addRecipe(
            req.body.name, req.body.description, req.body.ingredients);

        if(!serviceResult){
            return res.json({errors: "Existing recipe"});
        }

        return res.json({result: serviceResult});
});

recipeRouter.post(
    "/edit",
    body("recipe").isObject(),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            logger.warn(`Invalid request format`);
            return res.json({errors: errors.array()});
        }
    
        const serviceResult = await recipeService.editRecipe(req.body.recipe);

        if(!serviceResult){
            return res.json({errors: "Existing recipe"});
        }

        return res.json({result: serviceResult});
});

module.exports = recipeRouter;