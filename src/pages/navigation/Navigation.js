import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  return (
    <nav className="navbar navbar-dark navbar-expand-sm bg-dark fixed-top">
      <div className="container">
        <a href="/" className="navbar-brand">
          <FontAwesomeIcon icon={faBlog} /> &nbsp; Nihon Agriculture
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/getalllocation" className="nav-link active">Home</a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link active">Logout</a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
