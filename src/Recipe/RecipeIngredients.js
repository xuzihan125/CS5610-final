function RecipeIngredients({ recipe }) {
    return (
        <div>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.ingredient.name}
                        <br></br>
                        {ingredient.unit}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeIngredients;