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
          <div className="hero-buttons">
            <Link to="/orders" className="cta-button">Get Started</Link>
            <a href="#features" className="cta-button-secondary">Learn More</a>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">📈</div>
            <div className="stat-number">100%</div>
            <div className="stat-label">Accurate Calculations</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⚡</div>
            <div className="stat-number">Fast</div>
            <div className="stat-label">Real-time Updates</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🔒</div>
            <div className="stat-number">Secure</div>
            <div className="stat-label">Data Protection</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">💡</div>
            <div className="stat-number">Easy</div>
            <div className="stat-label">Intuitive Interface</div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Key Features</h2>
        <p className="section-subtitle">Everything you need to manage your sales orders efficiently</p>
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

      <section className="benefits-section">
        <h2>Why Choose Our System?</h2>
        <div className="benefits-container">
          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <span className="benefit-icon">🚀</span>
            </div>
            <h3>Boost Productivity</h3>
            <p>Reduce order processing time by 50% with automated calculations and streamlined workflows</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <span className="benefit-icon">🎯</span>
            </div>
            <h3>Reduce Errors</h3>
            <p>Eliminate manual calculation errors with automatic tax and total computations</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon-wrapper">
              <span className="benefit-icon">📱</span>
            </div>
            <h3>Access Anywhere</h3>
            <p>Responsive design allows you to manage orders from any device, anywhere</p>
          </div>
          
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <p className="section-subtitle">Get started in just 4 simple steps</p>
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

      <section className="tech-stack-section">
        <h2>Built with Modern Technology</h2>
        <p className="section-subtitle">Powered by industry-leading technologies</p>
        <div className="tech-stack">
          <div className="tech-item">
            <div className="tech-logo">⚛️</div>
            <h4>React</h4>
            <p>Modern UI framework for dynamic interfaces</p>
          </div>
          <div className="tech-item">
            <div className="tech-logo">.NET</div>
            <h4>.NET Core</h4>
            <p>Robust backend API for data processing</p>
          </div>
          <div className="tech-item">
            <div className="tech-logo">🗄️</div>
            <h4>SQLite</h4>
            <p>Reliable database for data storage</p>
          </div>
          <div className="tech-item">
            <div className="tech-logo">🎨</div>
            <h4>Modern CSS</h4>
            <p>Beautiful, responsive design</p>
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
