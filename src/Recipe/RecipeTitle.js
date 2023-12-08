function RecipeTitle({ recipe }) {
    return (
        <div>
            <h1>{recipe.title}</h1>
            {recipe.author && <h2> By {recipe.author} </h2>}
            {recipe.cuisine && <h3> Cuisine: {recipe.cuisine} </h3>}
        </div>
    )
}

export default RecipeTitle;