import PropTypes from "prop-types";
import React,{useState, useEffect} from "react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";

export function PlacesAutocomplete() {
  const [fromAddr, setFromAddr] = useState("");
  const [toAddr, setToAddr] = useState("");
  const handleInputChange = function(e) {
    setFromAddr(e.target.value)
   
  }

  const handleInputChangeToAddr = function(e) {
    setToAddr(e.target.value)
  }

const  handleSelectSuggestfromAddr = (geocodedPrediction, originalPrediction) => {
    
  setFromAddr(geocodedPrediction.formatted_address)
}
const  handleSelectSuggesttoAddr = (geocodedPrediction, originalPrediction) => {
        setToAddr(geocodedPrediction.formatted_address)
        calculateDistance();
}
const calculateDistance =() => {
  
  const directionsService= new window.google.maps.DirectionsService();
  const route = {
      origin: fromAddr,
      destination: toAddr,
      travelMode: 'DRIVING'
  }

  directionsService.route(route,
    function(response, status) {
      if (status !== 'OK') {
        window.alert('Directions request failed due to ' + status);
        return;
      } else {
        var directionsData = response.routes[0].legs[0];
        if (!directionsData) {
          window.alert('Directions request failed');
          return;
        }
        else {
          document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
        }
      }
    });
}

    return (
      <>
      <ReactGoogleMapLoader
        params={{
          // Add your API key
          key: "YOUR_API_KEY",
          libraries: "places,geocode"
        }}
        render={(googleMaps) =>
          googleMaps && (
            <div>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{ input: fromAddr }}
                googleMaps={googleMaps}
                onSelectSuggest={handleSelectSuggestfromAddr}
              >
                <input
                  type="text"
                  value={fromAddr}
                  placeholder="Search From location"
                  onChange={(event) => {handleInputChange(event)}}
                />
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />
      <ReactGoogleMapLoader
        params={{
          // Add your API key
          key: "YOUR_API_KEY",
          libraries: "places,geocode"
        }}
        render={(googleMaps) =>
          googleMaps && (
            <div>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{ input: toAddr }}
                googleMaps={googleMaps}
                onSelectSuggest={handleSelectSuggesttoAddr}
              >
                <input
                  type="text"
                  value={toAddr}
                  placeholder="Search to location"
                  onChange={(event) => handleInputChangeToAddr(event)}
                />
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />
      </>
    );
}

PlacesAutocomplete.propTypes = {
  googleMaps: PropTypes.object
};

export default PlacesAutocomplete;
