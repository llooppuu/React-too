import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

const currencyFormatter = new Intl.NumberFormat("et-EE", {
    style: "currency",
    currency: "EUR",
});

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const formattedPrice = currencyFormatter.format(Number(props.meal.price));

    const handleAddToCart = () => {
        const itemToAdd = {
            id: props.meal.id,
            name: props.meal.name,
            price: Number(props.meal.price)
        };

        const currentTotalQuantity = cartCtx.items.reduce(
            (sum, item) => sum + (item.quantity ?? item.amount ?? 0),
            0
        );
        const nextQuantity = currentTotalQuantity + 1;

        console.log("Added to cart:", { ...itemToAdd, quantity: nextQuantity });
        cartCtx.addItem(itemToAdd);
    };

    return (
        <li className="meal-item">
            <article>
                <img src={require(`../assets/${props.meal.image}`)} alt={props.meal.name}/>
                <div>
                    <h3>{props.meal.name}</h3>
                    <p className="meal-item-price">{formattedPrice}</p>
                    <p className="meal-item-description">{props.meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
        
    )
}

export default MealItem