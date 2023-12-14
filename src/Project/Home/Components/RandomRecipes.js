import { Link, useLocation } from "react-router-dom";
import RecipeCard from '../../Recipes/RecipeCard.js';

function RandomRecipes() {
    const recipe = { title: "test recipe", image: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/07/what_to_know_apples_green_red_1296x728_header-1024x575.jpg", summary: "test summary test summary test summary test summary test summary test summary test summarytest summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary" }

    return (
        <div className="container-fluid">
            <div className=''>
                <h1 className='mb-3'>Not sure what to cook? Check out 10 random recipes for inspiration...</h1>
                <div className='row row-cols-1 row-cols-md-3 row-cols-xl-4 r g-4'>
                    <div className='col'>
                        <RecipeCard recipe={recipe} />
                    </div>
                    <div className='col'>
                        <RecipeCard recipe={recipe} />
                    </div>
                    <div className='col'>
                        <RecipeCard recipe={recipe} />
                    </div>
                    <div className='col'>
                        <RecipeCard recipe={recipe} />
                    </div>
                    <div className='col'>
                        <RecipeCard recipe={recipe} />
                    </div>
                    <div className='col'>
                        <RecipeCard recipe={recipe} />
                    </div>
                    <div className='col'>
                        <RecipeCard recipe={recipe} />
                    </div>
                    <div className='col'>
                        <RecipeCard recipe={recipe} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RandomRecipes;