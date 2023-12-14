function RecipeIngredients({ ingredients }) {
    return (
        <div>
            <h3>Ingredients:</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients && ingredients.map((ingredient, index) => (
                        <tr key={index}>
                            <td>{ingredient.ingredient.name}</td>
                            <td>{ingredient.quantity || ""}</td>
                            <td>{ingredient.unit || ""}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecipeIngredients;