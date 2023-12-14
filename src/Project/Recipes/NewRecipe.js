import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewRecipe() {

    const [title, setTitle] = useState('');
    const [cuisine, setCuisine] = useState('');
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
    const [image, setImage] = useState('');
    const [nutrient, setNutrient] = useState({
        nutrient: '',
        amount: 0,
        unit: ''
    })
    const [nutrients, setNutrients] = useState([]);


}

export default NewRecipe;