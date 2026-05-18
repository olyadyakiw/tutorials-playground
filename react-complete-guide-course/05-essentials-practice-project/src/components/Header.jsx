import Logo from '/investment-calculator-logo.png'

function Header() {
    return (
        <header id="header">
            <img src={Logo} />
            <h1>React Investment Calculator</h1>
        </header>
    )
}

export default Header
