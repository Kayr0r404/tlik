import { React, useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/cart';
import '../style/productDescription.css'

const ProductDescription = () => {
    const { addToCart } = useContext(CartContext);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    const item = data.find(data => data.id.toString() === id);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!item || error) {
        return <h1>Product not found</h1>;
    }


    return (
        <div className='product-container'>
            <div className="product-image">
                <img src={item.image} alt={item.title} />
            </div>
            <div className="product-description">
                <h1 className="product-title">{item.title}</h1>
                <p className="product-text">{item.description}</p>
                <div className="product-price">Price: R {item.price}</div>
                <button className="add-to-cart-button" disabled={item.quantity === 0 ? true : false} onClick={()=> addToCart(item)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
    
    
};

export default ProductDescription;
