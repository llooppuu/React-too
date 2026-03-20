import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

const defaultCartState = {
    items: []
};

const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        let updatedItems;

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const currentQuantity = existingItem.quantity ?? existingItem.amount ?? 0;
            const updatedItem = {
                ...existingItem,
                quantity: currentQuantity + 1
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = [
                ...state.items,
                { ...action.item, quantity: action.item.quantity ?? 1 }
            ];
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    if (action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        if (existingCartItemIndex === -1) {
            return state;
        }

        const existingItem = state.items[existingCartItemIndex];
        const currentQuantity = existingItem.quantity ?? existingItem.amount ?? 0;

        let updatedItems;

        if (currentQuantity <= 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: currentQuantity - 1
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            items: []
        };
    }

    return state;
};

export const CartContextProvider = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCart = (item) => {
        dispatchCartAction({ type: "ADD_ITEM", item });
    };

    const removeItemFromCart = (id) => {
        dispatchCartAction({ type: "REMOVE_ITEM", id });
    };

    const clearCart = () => {
        dispatchCartAction({ type: "CLEAR_CART" });
    };

    const totalAmount = cartState.items.reduce(
        (sum, item) => sum + item.price * (item.quantity ?? item.amount ?? 0),
        0
    );

    const cartContextValue = {
        items: cartState.items,
        totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        clearCart
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;