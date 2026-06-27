import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, MessageSquare } from 'lucide-react';
import ProtectedWhatsAppLink from './ProtectedWhatsAppLink';

const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="contact-widget-container">
      {/* Options that pop up when clicked */}
      <div className={`widget-options ${isOpen ? 'open' : ''}`}>
        <ProtectedWhatsAppLink phoneNumber="919394683474" className="widget-btn whatsapp" title="WhatsApp Us">
          <MessageCircle size={20} />
          <span className="widget-tooltip">WhatsApp</span>
        </ProtectedWhatsAppLink>
        <a href="mailto:work.binodshaw@gmail.com" className="widget-btn email" title="Email Us">
          <Mail size={20} />
          <span className="widget-tooltip">Email</span>
        </a>
        <a href="tel:+919394683474" className="widget-btn phone" title="Call Us">
          <Phone size={20} />
          <span className="widget-tooltip">Call</span>
        </a>
      </div>

      {/* Main Toggle Button */}
      <button 
        className={`widget-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquare size={28} />
      </button>
    </div>
  );
};

export default ContactWidget;
