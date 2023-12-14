import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [instruction, setInstruction] = useState({
        step: 1,
        instruction: ''
    })
    const [instructions, setInstructions] = useState([]);
    const [image, setImage] = useState(defaultImage);
    const [nutrient, setNutrient] = useState({
        nutrient: '',
        amount: 0,
        unit: ''
    })
    const [nutrients, setNutrients] = useState([]);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    return (
        <div className='container-fluid'>
            <h1>New Recipe</h1>
            {error && <div className='alert alert-danger my-1'>{error}</div>}
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
                
            </div>
        </div>
    )


}

export default NewRecipe;