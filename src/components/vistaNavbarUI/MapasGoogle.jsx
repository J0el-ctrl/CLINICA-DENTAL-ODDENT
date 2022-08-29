import React from 'react'
import GoogleMaps from "simple-react-google-maps"
const MapasGoogle = () => {
    return (
        <div className="container py-5">
        <GoogleMaps
          apiKey={"AIzaSyBJ73jVdZg14wnj9oBrP_Qar6t5RtUmPTw"}
          style={{ height: "400px", width: "650px" }}
          zoom={12}
          center={{
            lat: -12.007836,
            lng: -77.042550
          }}
          markers={[
            { lat: -11.975091, lng: -77.104723 },
            { lat: -12.039739, lng: -76.992596 }
            
          ]}
        />
        
      </div>
    )
}

export default MapasGoogle
