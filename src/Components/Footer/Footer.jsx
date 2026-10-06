// import React from 'react'
// import { Link } from 'react-router';
// import { CheckSquare} from 'lucide-react';
import "./Footer.css";


const Footer = () => {
  return (
    <footer className="site-footer">
  <div className="footer-container">
    <div>
      <a href="/" class="footer-brand">
        <div className="web-icon">
          <svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className="brand-name">TaskFlow</span>
      </a>
      <p className="brand-desc">The task manager that respects your hierarchy — admins, managers, and members working in sync.</p>
    </div>

    <div>
      <h4 className="col-title">Product</h4>
      <ul className="col-list">
        <li><a href="#">Features</a></li>
        <li><a href="#">Roles</a></li>
        <li><a href="#">Boards</a></li>
        <li><a href="#">Reports</a></li>
      </ul>
    </div>

    <div>
      <h4 className="col-title">Company</h4>
      <ul className="col-list">
        <li><a href="#">About</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Press</a></li>
      </ul>
    </div>

    <div>
      <h4 className="col-title">Resources</h4>
      <ul className="col-list">
        <li><a href="#">Docs</a></li>
        <li><a href="#">Help center</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">Changelog</a></li>
      </ul>
    </div>
  </div>
</footer>
  )
}

export default Footer