import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Sales Order Management System</h1>
          <p>Streamline your sales operations with our comprehensive order management solution</p>
          <Link to="/orders" className="cta-button">Get Started</Link>
        </div>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Easy Order Creation</h3>
            <p>Create and manage sales orders with a simple, intuitive interface</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Customer Management</h3>
            <p>Organize and track customer information efficiently</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Automatic Calculations</h3>
            <p>Real-time tax and amount calculations for accuracy</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Order Tracking</h3>
            <p>View and manage all your sales orders in one place</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✏️</div>
            <h3>Edit & Update</h3>
            <p>Easily modify existing orders and line items</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🗑️</div>
            <h3>Delete Orders</h3>
            <p>Remove orders that are no longer needed</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Select Customer</h3>
            <p>Choose a customer from your existing list</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add Line Items</h3>
            <p>Add products with quantities and prices</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Review Details</h3>
            <p>Check invoice date and reference information</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Save Order</h3>
            <p>Save your order and it appears in your order list</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Begin managing your sales orders today</p>
        <Link to="/orders" className="cta-button-large">Go to Orders</Link>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Sales Order Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
