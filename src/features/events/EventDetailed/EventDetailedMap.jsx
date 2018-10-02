import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon, Segment } from '../../../frameworks/semantic-ui-react/scripts';

const Marker = () => <Icon color="red" name="marker" size="big" />;


const EventDetailedMap = (props) => {
  const { lat, lng } = props;
  const center = [lat, lng];
  const zoom = 14;

  return (
    <Segment
      attached="bottom"
      style={{ padding: 0 }}
    >
      <div
        style={{ height: '300px', width: '100%' }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={lat}
            lng={lng}
          />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
