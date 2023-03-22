import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return(
        <header>
            <Link to='/' className='logo'>PrimeFlix</Link>
            <Link to='/favorites' className='favorites'>favoritos</Link>
        </header>
    )
}

export default Header