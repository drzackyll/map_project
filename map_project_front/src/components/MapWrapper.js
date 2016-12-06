import React from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import withScriptjs from "react-google-maps/lib/async/withScriptjs"

const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      ref={props.onMapLoad}
      zoom={17}
      center={props.center}
      options={{
        disableDefaultUI: true,
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
      }}
      onClick={props.onMapClick}
    >
      <Marker
        {...props.marker}
      />
    </GoogleMap>
  ))
)

export default MapWrapper
