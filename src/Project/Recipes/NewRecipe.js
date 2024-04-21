import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ingredientsClient from '../Ingredients/client.js';
import * as nutrientsClient from '../Nutrients/client.js';
import * as recipesClient from '../Recipes/client.js';
import * as recipesUseIngredientsClient from '../RecipesUseIngredients/client.js';
import * as recipesHaveNutrientsClient from '../RecipesHaveNutrients/client.js';
import { useSelector } from 'react-redux';


export const defaultImage = 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg';


function NewRecipe() {

    const [title, setTitle] = useState('');
    const [cuisine, setCuisine] = useState('Other');
    const [ingredient, setIngredient] = useState({
        ingredient: '',
        quantity: 0,
        unit: ''
    })
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState(defaultImage);
    const [nutrient, setNutrient] = useState({
        nutrient: '',
        amount: 0,
        unit: ''
    })
    const [nutrients, setNutrients] = useState([]);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    const { currentUser } = useSelector((state) => state.userReducer);
    const navigate = useNavigate();

    const handleSetVeg = () => {
        setIsVegetarian(!isVegetarian);
    }

    const handleSetGlu = () => {
        setIsGlutenFree(!isGlutenFree);
    }

    const handleAddUpdateIngredient = () => {
        setErrors([]);
        if (ingredient.ingredient === '' && ingredient.quantity === 0) {
            setErrors(['Please enter an ingredient.', 'Please enter a positive quantity for the ingredient.']);
            return;
        }
        if (ingredient.ingredient === '') {
            setErrors(['Please enter an ingredient.']);
            return;
        }
        if (ingredient.quantity === 0) {
            setErrors(['Please enter a postiive quantity.']);
            return;
        }
        else {
            setIngredients([...ingredients, ingredient]);
            setIngredient({
                ingredient: '',
                quantity: 0,
                unit: ''
            })
            setErrors([]);
            setSuccess('Ingredient added to the recipe.');
        }
    }

    const handleEditIngredient = (index) => {
        setIngredient(ingredients[index]);
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    }

    const handleDeleteIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setSuccess('Ingredient deleted from the recipe.');
        setIngredients(newIngredients);
    }

    const handleAddUpdateNutrient = () => {
        setErrors([]);
        if (nutrient.nutrient === '' && nutrient.amount === 0) {
            setErrors(['Please enter a nutrient.', 'Please enter a postiive amount for the nutrient.']);
            return;
        }
        if (nutrient.nutrient === '') {
            setErrors(['Please enter a nutrient.']);
            return;
        }
        if (nutrient.amount === 0) {
            setErrors(['Please enter a positive amount for the nutrient.']);
            return;
        }
        else {
            setNutrients([...nutrients, nutrient]);
            setNutrient({
                nutrient: '',
                amount: 0,
                unit: ''
            })
            setErrors([]);
            setSuccess('Nutrient added to the recipe.');
        }
    }

    const handleEditNutrient = (index) => {
        setNutrient(nutrients[index]);
        const newNutrients = nutrients.filter((_, i) => i !== index);
        setNutrients(newNutrients);
    }


    const handleDeleteNutrient = (index) => {
        const newNutrients = nutrients.filter((_, i) => i !== index);
        setSuccess('Nutrient deleted from the recipe.');
        setNutrients(newNutrients);
    }

    const addRecipeToDB = async () => {
        const author_id = currentUser._id;

        // Check if ingredients are all in DB; if not, add to DB
        for (const ingredientElement of ingredients) {
            // Check if ingredient is in DB
            let ingredientId;
            const existingIngredient = await ingredientsClient.findIngredientByName(ingredientElement.ingredient);
            // Ingredient not in DB, add to DB and update ingredientElement.ingredient to ObjectId
            if (!existingIngredient) {
                const newIngredient = await ingredientsClient.createIngredient({ name: ingredientElement.ingredient });
                ingredientId = newIngredient._id;
            }
            // Ingredient already in DB, update ingredientElement.ingredient to ObjectId
            else {
                ingredientId = existingIngredient._id;
            }
            ingredientElement.ingredient = ingredientId;
        }

        // Check if nutrients are all in DB; if not, add to DB
        for (const nutrientElement of nutrients) {
            let nutrientId;
            // Check if nutrient is in DB
            const existingNutrient = await nutrientsClient.findNutrientByName(nutrientElement.nutrient);
            // Nutrient not in DB, add to DB and update nutrientElement.nutrient to ObjectId
            if (!existingNutrient) {
                const newNutrient = await nutrientsClient.createNutrient({ name: nutrientElement.nutrient });
                nutrientId = newNutrient._id;
            }
            // Nutrient already in DB, update nutrientElement.nutrient to ObjectId
            else {
                nutrientId = existingNutrient._id;
            }
            nutrientElement.nutrient = nutrientId;
        }

        // Add recipe to DB
        const recipe = {
            title: title,
            cuisine: cuisine,
            author: author_id,
            ingredients: ingredients,
            instructions: instructions,
            image: image,
            nutrients: nutrients,
            isVegetarian: isVegetarian,
            isGlutenFree: isGlutenFree
        }
        console.log(recipe);
        const recipeInDB = await recipesClient.createRecipe(recipe);
        // Add recipe-ingredient, recipe-nutrient connections to DBs
        const recipeInDB_id = recipeInDB._id;
        for (const ingredientElement of ingredients) {
            const ingredient_id = ingredientElement.ingredient;
            await recipesUseIngredientsClient.recipeUsesIngredient(recipeInDB_id, ingredient_id);
        }
        for (const nutrientElement of nutrients) {
            const nutrient_id = nutrientElement.nutrient;
            await recipesHaveNutrientsClient.recipeHasNutrient(recipeInDB_id, nutrient_id);
        }
        navigate('/users/account');
    }

    return (
        <div className='container-fluid'>
            <div className='mt-3'>
                <h1>New Recipe</h1>
                {errors && errors.map((error, index) => (
                    <div key={index} className='alert alert-danger my-1'>{error}</div>
                ))}
                {success && <div className='alert alert-success my-1'>{success}</div>}
                <div className='m-3'>
                    <div className='mb-3'>
                        <label htmlFor='recipeTitle' className='form-label'>Title: </label>
                        <input
                            type='text'
                            className='form-control'
                            value={title}
                            id='recipeTitle'
                            onChange={(e) => setTitle(e.target.value)}
                            required />
                        <div className='invalid-feedback'>
                            Please enter a title.
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='recipeCuisine' className='form-label'>Cuisine: </label>
                        <select className='form-select' id='recipeCuisine' value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                            <option value='African'>African</option>
                            <option value='Asian'>Asian</option>
                            <option value='American'>American</option>
                            <option value='British'>British</option>
                            <option value='Cajun'>Cajun</option>
                            <option value='Caribbean'>Caribbean</option>
                            <option value='Chinese'>Chinese</option>
                            <option value='Eastern European'>Eastern European</option>
                            <option value='European'>European</option>
                            <option value='French'>French</option>
                            <option value='Mediterranean'>Mediterranean</option>
                            <option value='Mexican'>Mexican</option>
                            <option value='Middle Eastern'>Middle Eastern</option>
                            <option value='Nordic'>Nordic</option>
                            <option value='Southern'>Southern</option>
                            <option value='Spanish'>Spanish</option>
                            <option value='Thai'>Thai</option>
                            <option value='Vietnamese'>Vietnamese</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='recipeImage' className='form-label'>
                            Image URL:
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            value={image}
                            id='recipeImage'
                            onChange={(e) => setImage(!e.target.value)}
                        />
                    </div>
                    <div className=''>
                        <input
                            type='checkbox'
                            className='form-check-input me-2'
                            value={isVegetarian}
                            id='recipeIsVegetarian'
                            onChange={(e) => {
                                handleSetVeg()}
                            }
                        />
                        <label htmlFor='recipeIsVegetarian' className='form-label'>
                            Vegetarian
                        </label>
                    </div>
                    <div className='mb-1'>
                        <input
                            type='checkbox'
                            className='form-check-input me-2'
                            value={isGlutenFree}
                            id='recipeIsGlutenFree'
                            onChange={(e) => handleSetGlu()}
                        />
                        <label htmlFor='recipeIsGlutenFree' className='form-label'>
                            Gluten Free
                        </label>
                    </div>
                    <div className='mb-5'>
                        <div className='mb-1'>
                            Ingredients:
                        </div>
                        <div className='mb-3'>
                            <div className='row mb-3'>
                                <div className='col'>
                                    <input
                                        type='text'
                                        placeholder='ingredient'
                                        className='form-control me-2'
                                        value={ingredient.ingredient}
                                        onChange={(e) => setIngredient({ ...ingredient, ingredient: e.target.value })}
                                    />
                                </div>
                                <div className='col'>
                                    <input
                                        type='number'
                                        className='form-control me-2'
                                        value={ingredient.quantity}
                                        onChange={(e) => setIngredient({ ...ingredient, quantity: e.target.value })}
                                    />
                                </div>
                                <div className='col'>
                                    <input
                                        type='text'
                                        placeholder='unit, e.g. cups, tbsp ...'
                                        className='form-control me-2'
                                        value={ingredient.unit}
                                        onChange={(e) => setIngredient({ ...ingredient, unit: e.target.value })}
                                    />
                                </div>

                            </div>
                            <div className='mb-3 float-end'>
                                <button className='btn btn-primary me-2' onClick={() => handleAddUpdateIngredient()}>Add/Update Ingredient</button>
                            </div>
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th className='col-7 t'>Ingredient</th>
                                            <th className='col-2'>Amount</th>
                                            <th className='col-2'>Unit</th>
                                            <th className='col-1'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ingredients && ingredients.map((ingredient, index) => (
                                            <tr key={index}>
                                                <td>{ingredient.ingredient}</td>
                                                <td>{ingredient.quantity}</td>
                                                <td>{ingredient.unit}</td>
                                                <td>
                                                    <div className='btn-group'>
                                                        <button className='btn btn-warning me-2' onClick={
                                                            () => handleEditIngredient(index)
                                                        }>
                                                            Edit
                                                        </button>
                                                        <button className='btn btn-danger' onClick={() => handleDeleteIngredient(index)}>Delete</button>
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <div className='mb-1'>
                            Nutrients:
                        </div>
                        <div className='mb-3'>
                            <div className='row mb-3'>
                                <div className='col'>
                                    <input
                                        type='text'
                                        placeholder='nutrient'
                                        className='form-control me-2'
                                        value={nutrient.nutrient}
                                        onChange={(e) => setNutrient({ ...nutrient, nutrient: e.target.value })}
                                    />
                                </div>
                                <div className='col'>
                                    <input
                                        type='number'
                                        className='form-control me-2'
                                        value={nutrient.amount}
                                        onChange={(e) => setNutrient({ ...nutrient, amount: e.target.value })}
                                    />
                                </div>
                                <div className='col'>
                                    <input
                                        type='text'
                                        placeholder='unit, e.g. g, mg ...'
                                        className='form-control me-2'
                                        value={nutrient.unit}
                                        onChange={(e) => setNutrient({ ...nutrient, unit: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='mb-3 float-end'>
                                <button className='btn btn-primary me-2' onClick={() => handleAddUpdateNutrient()}>Add/Update Nutrient</button>
                            </div>
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th className='col-7 t'>Nutrient</th>
                                            <th className='col-2'>Amount</th>
                                            <th className='col-2'>Unit</th>
                                            <th className='col-1'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nutrients && nutrients.map((nutrient, index) => (
                                            <tr key={index}>
                                                <td>{nutrient.nutrient}</td>
                                                <td>{nutrient.amount}</td>
                                                <td>{nutrient.unit}</td>
                                                <td>
                                                    <div className='btn-group'>
                                                        <button className='btn btn-warning me-2' onClick={
                                                            () => handleEditNutrient(index)
                                                        }>
                                                            Edit
                                                        </button>
                                                        <button className='btn btn-danger' onClick={() => handleDeleteNutrient(index)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='recipeInstructions' className='form-label'>
                            Instructions:
                        </label>
                        <textarea
                            className='form-control'
                            value={instructions}
                            id='recipeInstructions'
                            onChange={(e) => setInstructions(e.target.value)}
                        />
                    </div>
                </div>
                <div className='float-end mb-5 me-3'>
                    <button className='btn btn-secondary me-2' onClick={() => navigate('/home')}>Cancel</button>
                    <button className='btn btn-success me-2' onClick={addRecipeToDB}>Create</button>
                </div>
            </div>
        </div >
    )
}

export default NewRecipe;
