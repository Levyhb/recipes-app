import React from 'react';
import { Link } from 'react-router-dom';
// import drinkIcon from '../images/drinkIcon.svg';
// import mealIcon from '../styles/images/food-icon.png';
import '../styles/components/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="fixed-bottom">
      <div className="footer-contents">
        <Link to="/drinks" className="icon">
          {/* <img
            className="footer-icons"
            src={ drinkIcon }
            alt="drink-icon"
            data-testid="drinks-bottom-btn"
          /> */}
          <lord-icon
            src="https://cdn.lordicon.com/szzsfswk.json"
            trigger="loop"
            delay="9000"
            colors="primary:#fcdc36,secondary:#fcdc36"
            stroke="100"
            style={ { width: '50px', height: '50px' } }
          />
        </Link>
        <Link to="/meals" className="icon">
          <lord-icon
            src="https://cdn.lordicon.com/jpdtnwas.json"
            trigger="loop"
            delay="9000"
            colors="primary:#fcdc36,secondary:#fcdc36"
            stroke="100"
            style={ { width: '50px', height: '50px' } }
          />
        </Link>
      </div>
    </footer>
  );
}
