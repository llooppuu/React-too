import { useState } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Button from "./components/UI/Button";
import Modal from "./components/UI/Modal";
import { CartContextProvider } from "./store/CartContext";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContextProvider>
      <Modal open={isCartOpen} onClose={handleCloseCart}>
        <h2>Your Cart</h2>
        <p>test</p>
        <p className="modal-actions">
          <Button textOnly onClick={handleCloseCart}>Close</Button>
        </p>
      </Modal>
      <Header onOpenCart={handleOpenCart} />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
