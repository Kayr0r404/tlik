import '../../style/footer.css'

const MainFooter = () => {
    return (
      <footer className="main-footer">
        <div className="customer-service">
          <h3>Customer Service</h3>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>FAQ</li>
            <li>Addresses</li>
            <li>My Account</li>
            <li>Edit Account</li>
            <li>Lost Password</li>
          </ul>
        </div>
  
        <div className="get-in-touch">
          <h3>Get In Touch</h3>
          <form>
            <input placeholder="Full Name" type="text" aria-label="Full Name" required />
            <input placeholder="Email" type="email" aria-label="Email" required />
            <input placeholder="Phone" type="tel" aria-label="Phone" />
            <textarea placeholder="Message" aria-label="Message" rows="4" style={{ resize: 'vertical' }}></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
  
        <div className="newsletter-subscription">
          <h3>Newsletter Subscription</h3>
          <form>
            <input placeholder="Full Name" type="text" aria-label="Full Name" required />
            <input placeholder="Email" type="email" aria-label="Email" required />
            <button type="submit">Signup</button>
          </form>
        </div>
      </footer>
    );
  };
  
  export default MainFooter;
  