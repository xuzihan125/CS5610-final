function RecipeTitle({ title, author, cuisine }) {
    return (
        <div>
            <h1>{title}</h1>
            {author && <h2> By {author.username} </h2>}
            {cuisine && <h3> Cuisine: {cuisine} </h3>}
        </div>
    )
}

export default RecipeTitle;