import { CartContext } from '../context/cart';
import { WishListContext } from '../context/wishList';
import { useContext} from 'react';
import { Link } from 'react-router-dom';
import '../style/cart.css';
import cart from '../assets/cart.png';
import { AuthContext } from '../context/authContext';

export default function Cart() {
    const { isAuthenticated } = useContext(AuthContext)
    const { addToWishList } = useContext(WishListContext);
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, deleteItemInCart } = useContext(CartContext);
    
    if (cartItems.length === 0) {
        return (
            <div className='empty-cart'>
                <h3>Your shopping cart is empty</h3>
                <div><img src={cart} alt="Empty cart" /></div>
                <button className="shopping-button button"> <Link style={{textDecoration: 'none'}} to='/'>Continue Shopping</Link></button>
            </div>
        );
    }

    return (
        <div className='cart-container'>
            <h2>SHOPPING CART : {cartItems.length} {cartItems.length === 1 ? <span>item</span> : <span>items</span>}</h2>
            <div className='cart'>
                <div className='cart-items'>
                    {
                        cartItems.map((item) =>
                            <div className='cart-card' key={item.id}>
                                <div className='cart-card-content'>
                                    <div className='img-title'>
                                        <img src={item.image} alt={item.title} />
                                        <div className='item-details'>
                                            <span className='item-title'>{item.title}</span>
                                            <span className='delivery-info'>2 - 5 Days delivery | Pickup</span>
                                            <span className='quantity-control'>
                                                <button onClick={() => removeFromCart(item)}>-</button>
                                                <input type="text" value={item.quantity} readOnly />
                                                <button onClick={() => addToCart(item)}>+</button>
                                            </span>
                                            <div className='wishlist-remove'>
                                                <button onClick={() => { addToWishList(item); deleteItemInCart(item); }}>Add to wishlist</button>
                                                <button onClick={() => deleteItemInCart(item)}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item-price'>
                                        <p>R {Math.floor(item.price)}<sup>{(item.price + "").split(".")[1]}</sup></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className='cart-summary'>
                    <h2>Your Order Summary</h2>
                    <p className='summary-detail'>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}): <span className='subtotal-price'>R {Math.round(getCartTotal() * 100) / 100}</span></p>
                    <p className='summary-detail'>You save: <span className='savings-price'>- R {Math.round(cartItems.reduce((acc, item) => acc + item.discount, 0) * 100) / 100}</span></p>
                    <p className='summary-detail'>Delivery Fee: <span style={{ color: '#cf008c' }} className='delivery-fee'>{getCartTotal() >= 600 ? 'Free' : 'R ' + 60}</span></p>
                    <p className='total-price'>Total: R {getCartTotal() < 600 ? (Math.round(getCartTotal() * 100) / 100) + 60 : (Math.round(getCartTotal() * 100) / 100)}</p> 
                    <button onClick={() => clearCart()}>Clear Cart</button>
                    <Link id='checkout' to={ isAuthenticated ? '/checkout' : '/login' }>CheckOut</Link>
                </div>
            </div>
            <p>Placing an item in your shopping cart does not reserve that item or price. We only reserve stock for your order once payment is received.</p>
        </div>
    );
}
