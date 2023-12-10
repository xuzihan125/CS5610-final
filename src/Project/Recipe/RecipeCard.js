import './RecipeCard.css';
import * as helper from '../Helper';
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
    return (
        <div className="card h-100">
            <img src={recipe.image} className="card-img-top" alt={recipe.title} />
            <div className="card-body">
                <h5 className='card-title'>
                    {recipe.title}
                </h5>
                <p className='card-text'>
                    {helper.trimString(recipe.summary, 100)}
                </p>
                <Link to={`/recipe/${recipe._id}`} className="btn btn-success">View Recipe</Link>
            </div>
        </div>
    )
}

export default RecipeCard;