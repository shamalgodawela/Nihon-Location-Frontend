import React, { useState } from 'react';
import './addlocation.css'
import Footer from '../footer/Footer';

const Addlocation = () => {
    const [shopName, setShopName] = useState('');
    const [exeId, setExeId] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleShopNameChange = (event) => {
        setShopName(event.target.value);
    };

    const handleExeIdChange = (event) => {
        setExeId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Set loading state to true

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
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
                // Clear input fields after successful submission
                setShopName('');
                setExeId('');
            } else {
                console.error('Failed to save location');
                alert('Failed to save location');
            }
        } catch (error) {
            console.error('Error getting user location:', error);
            alert('Error getting user location');
        } finally {
            setIsLoading(false); // Set loading state to false
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
                        <input type="text" id="shopName" value={shopName} onChange={handleShopNameChange} />
                    </div>
                    <div className="form1-group">
                        <label htmlFor="exeId">Executive ID:</label>
                        <select id="exeId" value={exeId} onChange={handleExeIdChange}>
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
