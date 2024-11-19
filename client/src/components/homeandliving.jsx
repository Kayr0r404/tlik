import { ProductList } from "./ProductList";
import { useState, useEffect } from "react";


const HomeandLiving = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/home_and_living")
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <h1 style={{color: 'red'}}>Error: {error.message}</h1>;
    }

    return (
       <ProductList products={data} />

    );
};

export default HomeandLiving;