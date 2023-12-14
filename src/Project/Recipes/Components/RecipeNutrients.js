function RecipeNutrients({ nutrients }) {
    return (
        <div>
            <h3>Nutrients:</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nutrient</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {nutrients && nutrients.map((nutrient, index) => (
                        <tr key={index}>
                            <td>{nutrient.nutrient.name}</td>
                            <td>{nutrient.quantity || ""}</td>
                            <td>{nutrient.unit || ""}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecipeNutrients;