import { useEffect } from "react";

const Meals = () => {
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch("http://localhost:3001/meals");

                if (!response.ok) {
                    throw new Error("Failed to fetch meals.");
                }

                const data = await response.json();
                console.log("Meals from backend:", data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMeals();
    }, []);

    return (
        <ul id="meals">
            { 
                // list of meals
            }
        </ul>
    )
}

export default Meals