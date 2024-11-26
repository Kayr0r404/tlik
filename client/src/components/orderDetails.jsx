import { useEffect, useState } from "react";
import '../style/profile.css';
import { useParams } from "react-router-dom";

const OrderDetails = () => {
    const { orderNum } = useParams()
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/get-order/${orderNum}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setOrder(await response.json());
      }
    };
    fetchData();
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <table className="profile-table">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {order ? (
              order.map(order => (
                <tr>
                <td>{order.product}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>{`R ${order.price * order.quantity}`}</td>
              </tr>
              ))
          ) : (
            <tr>
              <td colSpan="5">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default OrderDetails;
