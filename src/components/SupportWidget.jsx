import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { saveSupportTicket } from '../firebase';

const CATEGORIES = [
  { id: 'payment', label: 'Payment / Refund Issue' },
  { id: 'registration', label: 'Registration / Ticket Not Received' },
  { id: 'leaderboard', label: 'Leaderboard / Strava Sync' },
  { id: 'general', label: 'General Query / Other' },
];

const FAQS = {
  payment: [
    { q: 'Money deducted but no ticket received?', a: 'Please wait up to 10-15 minutes. Sometimes bank networks delay confirmations. If still not received, continue below.' },
    { q: 'I want to upgrade my pass.', a: 'You can upgrade by paying the difference amount. Please submit a request below.' }
  ],
  registration: [
    { q: 'Where is my ticket?', a: 'Check your spam/promotions folder for an email from Townscript.' }
  ],
  leaderboard: [
    { q: 'How to link Strava?', a: 'Instructions will be sent 2 days before the event starts.' }
  ],
  general: []
};

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Category, 2: FAQ, 3: Form, 4: Success
  const [category, setCategory] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  const resetWidget = () => {
    setStep(1);
    setCategory(null);
    setFormData({ name: '', email: '', phone: '', description: '' });
    setTicketId(null);
  };

  const handleOpen = () => {
    resetWidget();
    setIsOpen(true);
  };

  const handleCategorySelect = (catId) => {
    setCategory(catId);
    if (FAQS[catId] && FAQS[catId].length > 0) {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const generatedId = 'RF-' + Math.floor(1000 + Math.random() * 9000);
    
    const ticketData = {
      ...formData,
      category,
      ticketId: generatedId,
      source: 'runfest'
    };
    
    const success = await saveSupportTicket(ticketData);
    
    setIsSubmitting(false);
    if (success) {
      setTicketId(generatedId);
      setStep(4);
    } else {
      alert("Failed to submit request. Please try again.");
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#111827',
          color: '#FFF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          border: '2px solid #C4F042',
          zIndex: 9998,
          cursor: 'pointer'
        }}
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Modal Overlay & Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)'
              }}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              style={{
                position: 'relative',
                backgroundColor: '#FFF',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '450px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Header */}
              <div style={{
                padding: '24px',
                borderBottom: '1px solid #F3F4F6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#F9FAFB',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px'
              }}>
                <h3 style={{ margin: 0, fontFamily: '"Inter", sans-serif', fontSize: '18px', fontWeight: 600, color: '#111827' }}>
                  {step === 4 ? 'Request Submitted' : 'RunFest Support'}
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6B7280', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '24px' }}>
                
                {/* Step 1: Categories */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <p style={{ margin: '0 0 20px 0', color: '#4B5563', fontSize: '15px' }}>Hi there! What do you need help with?</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.id)}
                          style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '16px', backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB',
                            borderRadius: '12px', cursor: 'pointer', fontFamily: '"Inter", sans-serif',
                            fontSize: '15px', fontWeight: 500, color: '#1F2937', transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E5E7EB'; e.currentTarget.style.borderColor = '#D1D5DB'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
                        >
                          {cat.label}
                          <ChevronRight size={18} color="#9CA3AF" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: FAQs */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                      <button onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: '#3B82F6', cursor: 'pointer', fontSize: '14px', padding: 0 }}>&larr; Back</button>
                    </div>
                    <p style={{ margin: '0 0 20px 0', color: '#111827', fontSize: '16px', fontWeight: 600 }}>Quick Solutions</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                      {FAQS[category]?.map((faq, i) => (
                        <div key={i} style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#0F172A' }}>{faq.q}</h4>
                          <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{faq.a}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setStep(3)}
                      style={{
                        width: '100%', padding: '14px', backgroundColor: '#111827', color: '#FFF',
                        border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 600,
                        cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                      }}
                    >
                      I still need help <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Form */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                      <button onClick={() => setStep(FAQS[category]?.length > 0 ? 2 : 1)} style={{ background: 'transparent', border: 'none', color: '#3B82F6', cursor: 'pointer', fontSize: '14px', padding: 0 }}>&larr; Back</button>
                    </div>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Full Name *</label>
                        <input 
                          type="text" required
                          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Email *</label>
                          <input 
                            type="email" required
                            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Phone *</label>
                          <input 
                            type="tel" required
                            value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Describe your issue *</label>
                        <textarea 
                          required rows={4}
                          value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '15px', resize: 'vertical' }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          width: '100%', padding: '14px', backgroundColor: isSubmitting ? '#9CA3AF' : '#111827', color: '#FFF',
                          border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 600,
                          cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '8px'
                        }}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                      <CheckCircle2 size={64} color="#10B981" />
                    </div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#111827' }}>Request Received!</h3>
                    <p style={{ margin: '0 0 20px 0', fontSize: '15px', color: '#4B5563', lineHeight: 1.5 }}>
                      We have safely received your request. Our support team will get back to you shortly.
                    </p>
                    <div style={{ backgroundColor: '#F3F4F6', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                      <span style={{ fontSize: '13px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Your Ticket ID</span>
                      <span style={{ fontSize: '24px', fontWeight: 700, color: '#111827', letterSpacing: '1px' }}>{ticketId}</span>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      style={{
                        width: '100%', padding: '14px', backgroundColor: '#F3F4F6', color: '#111827',
                        border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '15px', fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Close Window
                    </button>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SupportWidget;
