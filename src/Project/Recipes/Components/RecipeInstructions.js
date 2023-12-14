import React from "react";

function RecipeInstructions({ instructions }) {

    const renderInstructions = (instructions) => {
        if (instructions) {
            if (instructions.includes('<br />')) {
                return (
                    <div>{instructions.split("<br />").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index !== instructions.split("<br />").length - 1 && <br />}
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