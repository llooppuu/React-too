import { createContext, useState } from "react";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
});

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (item) => {
        setCartItems((prevItems) => {
            const existingCartItemIndex = prevItems.findIndex(
                (cartItem) => cartItem.id === item.id
            );
            const updatedItems = [...prevItems];

            if (existingCartItemIndex > -1) {
                const existingItem = prevItems[existingCartItemIndex];
                updatedItems[existingCartItemIndex] = {
                    ...existingItem,
                    amount: existingItem.amount + item.amount
                };
            } else {
                updatedItems.push({ ...item });
            }

            return updatedItems;
        });
    };

    const removeItemFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.amount,
        0
    );

    const cartContextValue = {
        items: cartItems,
        totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;