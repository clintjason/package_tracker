import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import { Button, TextField, Grid } from '@mui/material';

import blueDot from '../../assets/blue-dot.png';
import greenDot from '../../assets/green-dot.png';
import redDot from '../../assets/red-dot.png';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log('GOOGLE_MAPS_API_KEY: ', GOOGLE_MAPS_API_KEY);
const mapStyles = {
  width: '60%',
  height: '100%',
};

const GoogleMap = ({
  google,
  currentLocation,
  sourceLocation,
  destinationLocation,
}) => {
  const calculateDistance = () => {
    // Use the Google Maps Distance Matrix API to calculate the distance between source and destination
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [
          new google.maps.LatLng(sourceLocation.lat, sourceLocation.lng),
        ],
        destinations: [
          new google.maps.LatLng(destinationLocation.lat, destinationLocation.lng),
        ],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      },
      (response, status) => {
        if (status === 'OK') {
          const distance = response.rows[0].elements[0].distance.text;
          console.log(`Distance: ${distance}`);
        } else {
          console.error('Error calculating distance:', status);
        }
      }
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Source Location"
          variant="outlined"
          fullWidth
          defaultValue={`${sourceLocation?.lat}, ${sourceLocation?.lng}`}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Destination Location"
          variant="outlined"
          fullWidth
          defaultValue={`${destinationLocation?.lat}, ${destinationLocation?.lng}`}
        />
      </Grid>
      <Grid item xs={12}>
        <Map
          google={google}
          zoom={8}
          style={mapStyles}
          initialCenter={currentLocation}
          apiKey={GOOGLE_MAPS_API_KEY}
        >
          {currentLocation?.lat !== 0 && currentLocation?.lng !== 0 && (
            <Marker
              position={{
                lat: currentLocation?.lat,
                lng: currentLocation?.lng,
              }}
              title="Current Location"
              icon={{
                url: blueDot,
                scaledSize: new google.maps.Size(32, 32),
              }}
            />
          )}
          {sourceLocation?.lat !== 0 && sourceLocation?.lng !== 0 && (
            <Marker
              position={{
                lat: sourceLocation?.lat,
                lng: sourceLocation?.lng,
              }}
              title="Source Location"
              icon={{
                url: greenDot,
                scaledSize: new google.maps.Size(32, 32),
              }}
            />
          )}
          {destinationLocation?.lat !== 0 && destinationLocation?.lng !== 0 && (
            <Marker
              position={{
                lat: destinationLocation?.lat,
                lng: destinationLocation?.lng,
              }}
              title="Destination Location"
              icon={{
                url: redDot,
                scaledSize: new google.maps.Size(32, 32),
              }}
            />
          )}
          {sourceLocation?.lat !== 0 &&
           sourceLocation?.lng !== 0 &&
           destinationLocation?.lat !== 0 &&
           destinationLocation?.lng !== 0 && (
            <Polyline
              path={[
                { lat: sourceLocation?.lat, lng: sourceLocation?.lng },
                { lat: destinationLocation?.lat, lng: destinationLocation?.lng },
              ]}
              strokeColor="#FF0000"
              strokeOpacity={0.8}
              strokeWeight={4}
            />
          )}
        </Map>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={calculateDistance}>
          Calculate Distance
        </Button>
      </Grid>
    </Grid>
  );
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(GoogleMap);