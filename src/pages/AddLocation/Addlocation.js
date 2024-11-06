import React, { useState } from 'react';
import './addlocation.css';
import Footer from '../footer/Footer';

const Addlocation = () => {
  const [shopName, setShopName] = useState('');
  const [exeId, setExeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleShopNameChange = (event) => {
    setShopName(event.target.value);
  };

  const handleExeIdChange = (event) => {
    setExeId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const position = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Geolocation request timed out')), 20000); // 20 seconds timeout
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { accuracy, latitude, longitude } = position.coords;
            console.log(`Accuracy: ${accuracy} meters, Latitude: ${latitude}, Longitude: ${longitude}`);
            if (accuracy <= 20000) { 
              clearTimeout(timeout); 
              resolve(position); 
            } else {
              alert(`GPS signal is weak (Accuracy: ${accuracy} meters). Try moving to an open area.`);
              clearTimeout(timeout); 
            }
          },
          (error) => {
            console.error('Geolocation Error:', error);
            clearTimeout(timeout); 
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
        );
      });
  
      const { latitude, longitude } = position.coords;
  
      // Send data to backend
      const response = await fetch('https://location-app-api.onrender.com/api/addlocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          exeId,
          shopName,
          latitude,
          longitude
        })
      });
  
      // Log and handle the response from the backend
      if (response.ok) {
        console.log('Location saved successfully');
        alert('Location saved successfully');
        setShopName('');
        setExeId('');
      } else {
        const errorText = await response.text(); // Get the error text from the response
        console.error('Failed to save location:', errorText);
        alert(`Failed to save location: ${errorText}`);
      }
    } catch (error) {
      console.error('Error getting user location or saving data:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className='body-addlocation'>
      <h1 className='h1-addlocation'>Location Tracker</h1>
      <p className='p-addlocation'>This component is used to track the user's location </p>
      <div className="form1-container">
        <form onSubmit={handleSubmit}>
          <div className="form1-group">
            <label htmlFor="shopName">Shop Name:</label>
            <input type="text" id="shopName" value={shopName} onChange={handleShopNameChange} required />
          </div>
          <div className="form1-group">
            <label htmlFor="exeId">Executive ID:</label>
            <select id="exeId" value={exeId} onChange={handleExeIdChange} required>
              <option value="">Select Executive</option>
              <option value="Mr.Nayum">Mr.Nayum</option>
              <option value="Mr.Ahamed">Mr.Ahamed</option>
              <option value="Mr.Chamera">Mr.Chamera</option>
              <option value="Mr.Dasun">Mr.Dasun</option>
              <option value="Mr.Navaneedan">Mr.Navaneedan</option>
            </select>
          </div>
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Location'}
          </button>
        </form>
      </div>
      <br /><br /><br /><br />
      <Footer />
    </div>
  );
};

export default Addlocation;
