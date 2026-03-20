import logo from '../assets/logo.jpg'
console.log(logo)
const Header = () => {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Logo"/>
                <h1>React Food Order App</h1>
            </div>
            <nav>
            <button>Cart (0)</button>
            </nav>
        </header>
    )
}

export default Header