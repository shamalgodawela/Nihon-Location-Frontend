import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'
import { IoLocationOutline } from "react-icons/io5";


const AllLocations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all location details from the backend
    fetch('http://localhost:5000/api/getAlllocations')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching location details:', error));
  }, []);

  const handleViewDetails = async (id) => {
    try {
      // Fetch the details of the selected location by ID
      const response = await fetch(`https://mern-location-app-api.onrender.com/api/location/${id}`);
      const data = await response.json();
      setSelectedLocation(data);
      
      
      navigate(`/location/${id}`)
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };

  return (
    <div className="all-locations-container">
      <h2 id='hloc'>All Locations</h2>
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
              <td>{location.timestamp}</td>
              
              <td>
                <IoLocationOutline className='iconlocation' onClick={() => handleViewDetails(location._id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllLocations;
