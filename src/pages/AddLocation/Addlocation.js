import React, { useState } from 'react';
import './addlocation.css'
const Addlocation = () => {
    const [shopName, setShopName] = useState('');
    const [exeId, setExeId] = useState('');

    const handleShopNameChange = (event) => {
        setShopName(event.target.value);
    };

    const handleExeIdChange = (event) => {
        setExeId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;

            
            const response = await fetch('https://mern-location-app-api.onrender.com/api/addlocation', {
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
                // Clear input fields after successful submission
                setShopName('');
                setExeId('');
            } else {
                console.error('Failed to save location');
            }
        } catch (error) {
            console.error('Error getting user location:', error);
        }
    };

    return (
        <body>
        <div className="form-container">
          <h1>Location Tracker</h1>
          <p>This component is used to track the user's location and save it to the database.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="shopName">Shop Name:</label>
              <input type="text" id="shopName" value={shopName} onChange={handleShopNameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="exeId">Executive ID:</label>
              <input type="text" id="exeId" value={exeId} onChange={handleExeIdChange} />
            </div>
            <button type="submit" className="btn-submit">Save Location</button>
          </form>
        </div>
      </body>
    );
};

export default Addlocation;
