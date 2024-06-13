import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import './single.css'

const SingleLocation = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false); // State to track if map is loaded

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        // Fetch location details by ID from the backend
        const responseLocation = await fetch(`https://location-app-api.onrender.com/api/location/${id}`);
        const data = await responseLocation.json();
        setLocation(data);

        // Set Google Maps API key
        Geocode.setApiKey('AIzaSyBAlgKPW1nFYu1qSnZrF2WsFaR52NffnMU');

        // Fetch address based on latitude and longitude
        const { latitude, longitude } = data;
        const responseGeocode = await Geocode.fromLatLng(latitude, longitude);
        const address = responseGeocode.results[0].formatted_address;
        setAddress(address);
      } catch (error) {
        console.error('Error fetching location details:', error);
      }
    };

    fetchLocationDetails();
  }, [id]);

  // Callback function to set mapLoaded state to true when map is loaded
  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className='h2location'>Location Details</h2><br/>
      <LoadScript googleMapsApiKey="AIzaSyBAlgKPW1nFYu1qSnZrF2WsFaR52NffnMU" onLoad={handleMapLoad}>
      {mapLoaded && location && (
  <GoogleMap
    mapContainerStyle={{ width: '100%', height: '400px' }}
    center={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}
    zoom={12}
  >
    <div className="plocation"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '5px', 
        borderRadius: '5px', 
       
        backgroundColor: 'transparent',
       
      }}
    >
      <p className='plocation'>Here!</p>
    </div>
  </GoogleMap>
)}
      </LoadScript>
      
      <p className='p1location'>ExeId: {location.exeId}</p>
      <p className='p1location'>Shop Name: {location.shopName}</p>
    </div>
  );
};

export default SingleLocation;
