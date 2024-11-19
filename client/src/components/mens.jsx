import { useState, useEffect } from "react";
import { ProductList } from "./ProductList";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

export default function Men() {
    const { page = 1 } = useParams();
    const [currentPage, setCurrentPage] = useState(Number(page));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginationNumbers, setPaginationNumbers] = useState([]);
    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Update state
        navigate(`/Mens/${pageNumber}`); // Update URL
    };

    useEffect(() => {
        setLoading(true); // Reset loading state
        fetch(`/Mens/${currentPage}`)
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
            <h1>Men's Watches</h1>
            <ProductList products={data} />
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    {'<<'}
                </button>
                <Pagination
                    paginationNumbers={paginationNumbers}
                    onPageChange={handlePageChange}
                />
                <button
                    disabled={currentPage === paginationNumbers.length}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    {'>>'}
                </button>
            </div>
        </div>
    );
}
