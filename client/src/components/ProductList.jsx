import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../style/product_list.css';
import { CartContext } from '../context/cart';
import { WishListContext } from '../context/wishList';

function ProductList({ products }) {
    const { addToCart } = useContext(CartContext);
    const { addToWishList } = useContext(WishListContext);
    const [wishlist, setWishlist] = useState({});

    const toggleWishlist = (id, item) => {
        setWishlist((prev) => {
            const updatedWishlist = { ...prev, [id]: !prev[id] };
            if (!prev[id]) {
                addToWishList(item);
            }
            return updatedWishlist;
        });
    };

    return (
        <div className="product_list container" >
            {products.map((item) => (
                <div className="item" key={item.id} >
                    <div className="wishlist-icon">
                        <button onClick={() => toggleWishlist(item.id, item)} style={{ background: 'none', border: 'none' }}>
                            {wishlist[item.id] ? (
                                <FaHeart style={{ color: 'black', fontSize: '18px' }} />
                            ) : (
                                <FaRegHeart style={{ color: 'black', fontSize: '18px' }} />
                            )}
                        </button>
                    </div>

                    <Link to={`/${item.category_name}/${item.id}`}>
                        <img className="thumbnail" src={item.image} alt={item.title} />
                    </Link>
                    <div className="dec">
                        <span className="name">{item.category_name}</span>
                        <h5>{item.title}</h5>
                        {item.quantity <= 0 ? <h3 className='sold-out'>SOLD OUT</h3> : ""}
                        <h4>
                            R {Math.floor(item.price)} <sup>{(item.price % 1).toFixed(2).split('.')[1]}</sup>
                        </h4>
                    </div>
                    <button id="add-to-cart" disabled={item.quantity <= 0 ? true : false} onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}

export { ProductList };
