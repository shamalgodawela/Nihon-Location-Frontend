import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import { IoLocationOutline } from "react-icons/io5";
import Navigation from '../navigation/Navigation';
import Footer from '../footer/Footer';

const AllLocations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [exeId, setExeId] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all location details from the backend
    fetch('https://location-app-api.onrender.com/api/getAlllocations')
      .then(response => response.json())
      .then(data => {
        setLocations(data);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch(error => {
        console.error('Error fetching location details:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleViewDetails = async (id) => {
    try {
      // Fetch the details of the selected location by ID
      const response = await fetch(`https://location-app-api.onrender.com/api/location/${id}`);
      const data = await response.json();
      setSelectedLocation(data);
      
      navigate(`/location/${id}`);
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting a search
    try {
      // Fetch locations based on exeId and date
      const response = await fetch(`https://location-app-api.onrender.com/api/locationbydate?exeId=${exeId}&date=${date}`);
      const data = await response.json();
      setLocations(data);
      setLoading(false); // Set loading to false when data is loaded
    } catch (error) {
      console.error('Error fetching location details:', error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  return (
    <div>
      <Navigation/><br/><br/><br/>
      <h2 className='h2-admin'>Welcome to Nihon Executives Location Tracking System</h2>
      <br/><br/>
      
      <div className="search-form">
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="exeId">Executive ID:</label>
            <select
              id="exeId"
              value={exeId}
              onChange={(e) => setExeId(e.target.value)}
              required
            >
              <option value="">Select Executive</option>
              <option value="Mr.Ahamed">Mr.Ahamed</option>
              <option value="Mr.Chamera">Mr.Chamera</option>
              <option value="Mr.Dasun">Mr.Dasun</option>
              <option value="Mr.Sanjeewa">Mr.Sanjeewa</option>
              <option value="Mr.Navaneedan">Mr.Navaneedan</option>
            </select>
          </div>
          <div className="admindash-form">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <div className="all-locations-container">
        <h2 id='hloc'>All Locations</h2>
        {loading ? (
          <div className="loading">Loading...</div> // Add loading indicator
        ) : (
          <table>
            <thead>
              <tr>
                <th>ExeId</th>
                <th>Shop Name</th>
                <th>Date</th>
                <th>View Location</th>
              </tr>
            </thead>
            <tbody>
              {locations.map(location => (
                <tr key={location._id}>
                  <td>{location.exeId}</td>
                  <td>{location.shopName}</td>
                  <td>{new Date(location.timestamp).toLocaleDateString()}</td>
                  <td>
                    <IoLocationOutline className='iconlocation' onClick={() => handleViewDetails(location._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <br/><br/><br/>
      <Footer/>
    </div>
  );
};

export default AllLocations;
