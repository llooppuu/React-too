import { useContext } from 'react'
import logo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
console.log(logo)
const Header = ({ onOpenCart }) => {
    const cartCtx = useContext(CartContext);
    const totalCartItems = cartCtx.items.reduce(
        (sum, item) => sum + (item.quantity ?? item.amount ?? 0),
        0
    );

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Logo"/>
                <h1>React Food Order App</h1>
            </div>
            <nav>
            <Button textOnly onClick={onOpenCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}

export default Header