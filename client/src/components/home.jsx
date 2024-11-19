import '../style/home.css'
import '../style/slideshow.css'
import contact from '../assets/contact.png'
import gift from '../assets/gift.png'
import returns from '../assets/return.png'
import shipping from '../assets/shipping.png'
import women from '../assets/women.jpeg';
import men from '../assets/men.jpeg';
import living from '../assets/living.jpeg';
import { Link } from 'react-router-dom'


export default function Home() {
    return (
    <div>

        <div className="container">
        <div className="section">
            <Link to={'Women'}> <img src={women} alt="Women" />
            <div className="label">Women</div></Link>
        </div>
        <div className="section">
            <Link to={'Mens'}> <img src={men} alt="Men" />
            <div className="label">Men</div></Link>
        </div>
        <div className="section">
            <Link to={'Home + Living'}><img src={living} alt="Home + Living" />
            <div className="label">Home + Living</div></Link>
        </div>
        </div>
        <div className="features">
            <div className="feature">
                <img src={shipping} alt="" className="featureIcon" />
                <span className="featureTitle">FREE SHIPPING</span>
                <span className="featureDesc">Free worldwide shipping on all orders.</span>
            </div>
            <div className="feature">
                <img className="featureIcon" src={returns} alt="" />
                <span className="featureTitle">30 DAYS RETURN</span>
                <span className="featureDesc">No question return and easy refund in 14 days.</span>
            </div>
            <div className="feature">
                <img className="featureIcon" src={gift} alt="" />
                <span className="featureTitle">GIFT CARDS</span>
                <span className="featureDesc">Buy gift cards and use coupon codes easily.</span>
            </div>
            <div className="feature">
                <img className="featureIcon" src={contact} alt="" />
                <span className="featureTitle">CONTACT US!</span>
                <span className="featureDesc">Keep in touch via email and support system.</span>
            </div>
        </div>

        <div className='shipping'>SHIPPING ONLY AVAILABLE IN SOUTH AFRICA</div>

        <div className="gallery">
        <div className="galleryItem">
            <h1 className="galleryTitle">Be Yourself!</h1>
            <img src="https://images.pexels.com/photos/9295809/pexels-photo-9295809.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="" className="galleryImg" />
        </div>
        <div className="galleryItem">
            <img src="https://images.pexels.com/photos/1040427/pexels-photo-1040427.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="" className="galleryImg" />
            <h1 className="galleryTitle">This is the First Day of Your New Life</h1>
        </div>
        <div className="galleryItem">
            <h1 className="galleryTitle">Just Do it!</h1>
            <img src="https://images.pexels.com/photos/7856965/pexels-photo-7856965.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="" className="galleryImg" />
        </div>
    </div>
    <div className="newSeason">
        <div className="nsItem">
            <img src="https://images.pexels.com/photos/4753986/pexels-photo-4753986.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="" className="nsImg" />
        </div>
        <div className="nsItem">
            <h3 className="nsTitleSm">NEW SUMMER ARRIVALS</h3>
            <h1 className="nsTitle">New Season</h1>
            <h1 className="nsTitle">New Collection</h1>
            <a href="#nav">
                <button className="nsButton">CHOOSE YOUR STYLE</button>
            </a>
        </div>
        <div className="nsItem">
            <img src="https://images.pexels.com/photos/7856965/pexels-photo-7856965.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="" className="nsImg" />
        </div>
        </div>

    </div>
    );
}
