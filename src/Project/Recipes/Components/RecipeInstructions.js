import React from "react";

function RecipeInstructions({ instructions }) {
    return (
        <div>
            <h3>Steps:</h3>
            <div>{instructions.split("<br />").map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    {index !== instructions.split("<br />").length - 1 && <br />}
                </React.Fragment>
            )) || "No instructions available"}</div>
        </div>
    )
}

export default RecipeInstructions;