import logo from '../assets/logo.jpg'
import Button from './UI/Button'
console.log(logo)
const Header = () => {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Logo"/>
                <h1>React Food Order App</h1>
            </div>
            <nav>
            <Button textOnly>Cart (0)</Button>
            </nav>
        </header>
    )
}

export default Header