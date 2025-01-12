import Header from './components/Header.jsx';
import Login from './components/login.jsx'
import WishList from './components/wishlist.jsx';
import CreateAccount from './components/createAccount.jsx';
import Cart from './components/cart.jsx'
import CheckoutForm from './components/checkoutForm.jsx';
import Home from './components/home.jsx';
import Men from './components/mens.jsx';
import Women from './components/women.jsx';
import HomeandLiving from './components/homeandliving.jsx';
import { Routes, Route} from 'react-router-dom'
import ProductDescription from './components/productDescription.jsx';
import MainFooter from './components/footer/mainFooter.jsx';
import SuccesfullPayment from './components/checkout/success.jsx'
import Profile from './components/profile.jsx';
import OrderDetails from './components/orderDetails.jsx';
import ResetPassword from './components/profile/resetPassword.jsx';

function App() {
  return (
    <div style={{display:'grid',gridTemplateRows: 'auto 1fr auto', minHeight: '100dvh'}}>
      <header><Header /></header>
      <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path=':category_name/:id' element={<ProductDescription />} />
        <Route path="/Mens" element={<Men />} />
        <Route path='Home + Living' element={<HomeandLiving />}/>
        <Route path='Women' element={<Women />}/>
        <Route path='wishlist' element={<WishList/>}/>
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<CheckoutForm />}/>
        <Route path='login' element={<Login />} />
        <Route path="register" element={<CreateAccount />}/>
        <Route path="success" element={<SuccesfullPayment />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path=':orderNum' element={<OrderDetails />} />
        <Route path='reset-password' element={<ResetPassword />} />
      </Routes>
      </div>
      <footer><MainFooter /></footer>
    </div>
  );
}


export default App;