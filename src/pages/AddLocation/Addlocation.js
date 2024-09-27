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
      // Use a promise with a timeout to handle geolocation delay
      const position = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Geolocation request timed out')), 15000); // 15 seconds timeout
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { accuracy } = position.coords;
            console.log('GPS Accuracy:', accuracy);  // Log GPS accuracy in meters
            if (accuracy <= 50) {  // Accept locations with accuracy better than 50 meters
              // Proceed with saving the location
              resolve(position);
            } else {
              alert('GPS signal is weak. Try moving to an open area.');
            }
          },
          (error) => {
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
        );
        
      });

      const { latitude, longitude } = position.coords;

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

      if (response.ok) {
        console.log('Location saved successfully');
        alert('Location saved successfully');
        setShopName('');
        setExeId('');
      } else {
        console.error('Failed to save location:', await response.text());
        alert('Failed to save location');
      }
    } catch (error) {
      console.error('Error getting user location or saving data:', error);
      alert('Error getting user location or saving data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className='h1-addlocation'>Location Tracker</h1>
      <p className='p-addlocation'>This component is used to track the user's location and save it to the database.</p>
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
              <option value="Mr.Ahamed">Mr.Ahamed</option>
              <option value="Mr.Chamera">Mr.Chamera</option>
              <option value="Mr.Dasun">Mr.Dasun</option>
              <option value="Mr.Sanjeewa">Mr.Sanjeewa</option>
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
