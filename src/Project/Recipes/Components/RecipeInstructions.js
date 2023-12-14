function RecipeInstructions({ instructions }) {
    return (
        <div>
            <h3>Steps:</h3>
            <ol>
                {instructions && instructions.map((ins, index) => (
                    <li key={index}>{ins.instruction}</li>
                ))}
            </ol>
        </div>
    )
}

export default RecipeInstructions;