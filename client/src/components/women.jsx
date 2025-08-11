import { useState, useEffect } from "react";
import { ProductList } from "./ProductList";
import { useSearchParams, } from "react-router-dom";
import Pagination from "./Pagination";

export default function Women() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const currentPage = Number(searchParams.get("page")) || 1; // Default to page 1 if not provided
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginationNumbers, setPaginationNumbers] = useState([]);

    const handlePageChange = (pageNumber) => {
        setSearchParams({ page: pageNumber });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/Women?page=${currentPage}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setData(data.mans_watches);
                setPaginationNumbers(data.page_list);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [currentPage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <h1 style={{ color: "red" }}>Error: {error.message}</h1>;
    }

    return (
        <div>
            <h1>Ladies Watches</h1>
            <ProductList products={data} />
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <button
                    style={{ backgroundColor: 'transparent' }}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    {'<<'}
                </button>
                <Pagination
                    currentPage={currentPage}
                    paginationNumbers={paginationNumbers}
                    onPageChange={handlePageChange}
                />
                <button
                    style={{ backgroundColor: 'transparent' }}
                    disabled={currentPage === paginationNumbers.length}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    {'>>'}
                </button>
            </div>
        </div>
    );
}
