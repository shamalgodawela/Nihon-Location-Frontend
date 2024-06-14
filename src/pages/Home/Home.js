import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../footer/Footer';


const MyComponent = () => {
  return (
    <body className='bod1'>
      <div className='dev1'>

      <h1 className='heading'>Nihon Executive Location Tracking System</h1>
      <div className="center-container">
        <button type="button" className="btn btn-outline-success">
          <Link className='link1' to="/addlocation">Add Location</Link>
        </button>
        
      </div> 
      <div className="center-container">
      <button type="button" className="btn btn-outline-success">
          <Link className='link1' to="/login-admin">Admin Login</Link>
      </button>
        
        
      </div>       
      

      </div><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
        
            
            
        
    </body>
  );
};
export default MyComponent;
