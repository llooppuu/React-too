import { useState } from "react";
import { useContext } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Button from "./components/UI/Button";
import Modal from "./components/UI/Modal";
import CartContext, { CartContextProvider } from "./store/CartContext";

const currencyFormatter = new Intl.NumberFormat("et-EE", {
  style: "currency",
  currency: "EUR",
});

const AppContent = () => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenCart = () => {
    if (!hasItems) {
      window.alert("Ostukorv on tühi. Lisa enne toode.");
      return;
    }

    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    window.alert("Aitäh tellimuse eest!");
    cartCtx.clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      <Modal open={isCartOpen && hasItems} onClose={handleCloseCart}>
        <div className="cart">
          <h2>Your Cart</h2>
          <ul>
            {cartCtx.items.map((item) => (
              <li key={item.id} className="cart-item">
                <p>
                  {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
                </p>
                <div className="cart-item-actions">
                  <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
                  <button onClick={() => cartCtx.addItem(item)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">
            Total: {currencyFormatter.format(cartCtx.totalAmount)}
          </p>
          <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            <Button onClick={handleCheckout}>Checkout</Button>
          </p>
        </div>
      </Modal>
      <Header onOpenCart={handleOpenCart} />
      <Meals />
    </>
  );
};

const App = () => {
  return (
    <CartContextProvider>
      <AppContent />
    </CartContextProvider>
  );
};

export default App;
