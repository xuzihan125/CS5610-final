import React from "react";

function RecipeInstructions({ instructions }) {

    const renderInstructions = (instructions) => {
        if (instructions) {
            if (instructions.includes('\n')) {
                return (
                    <div>{instructions.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index !== instructions.split("\n").length - 1 && <br />}
                        </React.Fragment>
                    ))}</div>
                )
            } else {
                return (
                    <div>{instructions}</div>
                )
            }
        } else {
            return (
                <div>No instructions available</div>
            )
        }
    }
    return (
        <div>
            <h3>Instructions: </h3>
            {renderInstructions(instructions)}
        </div>
    )
}

export default RecipeInstructions;