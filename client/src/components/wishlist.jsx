import { CartContext } from '../context/cart';
import { WishListContext } from '../context/wishList';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../style/cart.css';
import brokenHeart from '../assets/broken-heart.png';

export default function WishList() {
    const { wishListItems , removeItemFromWishList, clearWishList } = useContext(WishListContext);
    const { addToCart } = useContext(CartContext);

    if (wishListItems.length === 0) {
        return (
            <div className="empty-cart">
              <h3>Your WishList is empty</h3>
              <div>
                <img src={brokenHeart} alt="Empty cart" />
              </div>
              <button className="shopping-button">
                <Link to="/">
                  Continue Shopping
                </Link>
              </button>
            </div>
          );
    }

    const removeItemWhenAddToCart = (item) => {
        addToCart(item);
        removeItemFromWishList(item);
    }
    return (
        <div className='cart-container'>
            <h2>WishList: {wishListItems.length} {wishListItems.length === 1 ? <span>item</span> : <span>items</span>}</h2>
            <div className='cart'>
                <div className='cart-items'>
                    {
                        wishListItems.map((item) =>
                            <div className='cart-card' key={item.id}>
                                <div className='cart-card-content'>
                                    <div className='img-title'>
                                        <img src={item.image} alt={item.title} />
                                        <div className='item-details'>
                                            <span className='item-title'>{item.title}</span>
                                            <div className='wishlist-remove'>
                                                <button onClick={() => removeItemWhenAddToCart(item)}>Add to Cart</button>
                                                <button onClick={() => removeItemFromWishList(item)}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div>
                        <button onClick={() => clearWishList()}>Clear WishList</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
