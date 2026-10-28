import React, { useState } from "react";
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";
import "./WhatsAppChat.css";

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const whatsappNumber = "+918809113638"; // Update with your WhatsApp number
  const businessName = "Dr. Amit Kumar Pushpam";

  const handleSendMessage = () => {
    if (message.trim()) {
      const encodedMessage = encodeURIComponent(
        `Hello! ${message}\n\n- Sent from Prosper Foundation Website`
      );
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
      setMessage("");
      setIsOpen(false);
    }
  };

  const handleQuickMessage = (text) => {
    const encodedMessage = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="whatsapp-float"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp />
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="whatsapp-widget">
          {/* Header */}
          <div className="whatsapp-header">
            <div className="header-content">
              <FaWhatsapp className="header-icon" />
              <div className="header-text">
                <h3>{businessName}</h3>
                <p>Typically replies within minutes</p>
              </div>
            </div>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="whatsapp-body">
            <div className="welcome-message">
              <p>
                👋 Hello! Welcome to {businessName}. How can we help you today?
              </p>
            </div>

            {/* Quick Messages */}
            <div className="quick-messages">
              <button
                className="quick-msg"
                onClick={() =>
                  handleQuickMessage(
                    "Hi! I'm interested in your eBooks. Can you tell me more?"
                  )
                }
              >
                📚 About eBooks
              </button>
              <button
                className="quick-msg"
                onClick={() =>
                  handleQuickMessage(
                    "I'd like to book a session. What are your available times?"
                  )
                }
              >
                🗓️ Book Session
              </button>
              <button
                className="quick-msg"
                onClick={() =>
                  handleQuickMessage(
                    "I have a general inquiry. Can you help?"
                  )
                }
              >
                ❓ General Inquiry
              </button>
            </div>
          </div>

          {/* Footer - Input */}
          <div className="whatsapp-footer">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows="3"
            />
            <button
              className="send-btn"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppChat;