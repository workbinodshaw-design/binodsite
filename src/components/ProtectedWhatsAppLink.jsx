import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth

const ProtectedWhatsAppLink = ({ phoneNumber, className, style, children, message }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    
    // Check if the user is authenticated
    const user = auth.currentUser;
    
    if (user) {
      // If logged in, open WhatsApp
      const url = `https://wa.me/${phoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
      window.open(url, '_blank', 'noreferrer');
    } else {
      // If not logged in, force them to the client login portal
      navigate('/client-login');
    }
  };

  return (
    <a 
      href={`https://wa.me/${phoneNumber}`} // Fallback for accessibility/hover
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
};

export default ProtectedWhatsAppLink;
