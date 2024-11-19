
import { Link } from "react-router-dom";
import cart from '../assets/cart.png';
import heart from '../assets/heart.png';
import twitter from '../assets/twitter.png';
import whatsapp from '../assets/whatsapp.png';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';

import '../style/header.css'
import { CartContext } from '../context/cart'
import { useContext, useState } from 'react'


const MainHeader = (props) => {
    const { cartItems } = useContext(CartContext);
    const [activeLink, setActiveLink] = useState('');
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger= () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <header className="main_header">
            <div className="hamburger" onClick={toggleHamburger}>
                ☰
            </div>
            <div className="nav-logo">
                <p ><Link className={activeLink === '' ? 'active' : ''}
                    onClick={() => handleLinkClick('')} style={{textDecoration: "none"}} to='/'>tlik</Link></p>
            </div>
            <ul className={hamburgerOpen ? "show" : "menu"} style={{display: `${hamburgerOpen ? 'inline' : ''}`}}>
            <li>
                <Link
                    to="Mens/1"
                    className={activeLink === 'Mens' ? 'active' : ''}
                    onClick={() => {handleLinkClick('Mens'); setHamburgerOpen(false)}}
                >
                    Men
                </Link>
            </li>
            <li>
                <Link
                    to="Women/1"
                    className={activeLink === 'Women' ? 'active' : ''}
                    onClick={() => {handleLinkClick('Women'); setHamburgerOpen(false)}}
                >
                    Women
                </Link>
            </li>
            <li>
                <Link
                    to="Home + Living"
                    className={activeLink === 'Home + Living' ? 'active' : ''}
                    onClick={() => handleLinkClick('Home + Living')}
                >
                    Home + Living
                </Link>
            </li>
        </ul>

            <nav className='login-cart'>
                <div id='login_bttn'><Link className={activeLink === '' ? 'active' : ''}
                    onClick={() => handleLinkClick('')} style={{textDecoration: "none"}} id='anc' to='Login'>Login</Link></div>
                <Link className={activeLink === '' ? 'active' : ''}
                    onClick={() => handleLinkClick('')} style={{textDecoration: "none"}} to='WishList'><img src={heart} alt='WishLists' className='cart_img' /></Link>
                <div id='cart'>
                    <Link className={activeLink === '' ? 'active' : ''}
                    onClick={() => handleLinkClick('')} style={{textDecoration: "none"}} id='cart-anchor' to='cart'>
                        <img className='cart_img' src={cart} alt="" />
                        <p style={{'color': 'red', 'fontSize': 'bold'}}>
                            {cartItems.length}
                        </p>
                    </Link>
                </div>
            </nav>
            {props.children}
        </header>
    );
}

const MiniHeader = () => {
    return (
        <div className="mini-header" >
            <div>
                <p>FREE SHIPPING ON ALL ORDERS !!</p>
                <ul>
                    <li > About us</li>
                    <li>Contact us</li>
                    <li>FAQ</li>
                    <li><img src={facebook} alt="facebook"/></li>
                    <li><img src={instagram} alt="instagram"/></li>
                    <li><img src={twitter} alt="twitter"/></li>
                    <li><img src={whatsapp} alt="whatsapp"/></li>
                </ul>
            </div>
        </div>
    );
}

function Header() {
    return (
        <header>
            <MiniHeader />
            <MainHeader />
        </header>
    );
}

export  default Header;