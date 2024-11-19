import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from 'react-router-dom';
import '../style/profile.css';

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/orders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setOrders(await response.json());
      }
    };
    fetchData();
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>
        {userData.first_name} {userData.last_name}
      </h2>
      <button
        onClick={() => {
          logout();
          window.location.reload();
        }}
        type="submit"
        className="logout-button"
      >
        Logout
      </button>

      <table className="profile-table">
        <thead>
          <tr>
            <th>#</th>
            <th>ORDER</th>
            <th>DATE</th>
            <th>PAYMENT STATUS</th>
            <th>FULFILLMENT STATUS</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order.order_number}>
                <td>{index + 1}</td>
                <Link to={`/${order.order_number}`} style={{textDecoration: 'none',}}><td>{order.order_number}</td></Link>
                <td>{order.date}</td>
                <td>Paid</td>
                <td>{order.order_status}</td>
                <td>{`R ${order.total}`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="account-details">
        <h4>Account Details</h4>
        
      </div>
    </>
  );
};

export default Profile;
