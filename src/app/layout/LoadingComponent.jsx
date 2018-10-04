import React from 'react';
import { Dimmer, Loader } from '../../frameworks/semantic-ui-react/scripts';

const LoadingComponent = (props) => {
  const { inverted } = props;

  return (
    <Dimmer
      active
      inverted={inverted}
    >
      <Loader
        content="Loading..."
      />
    </Dimmer>
  );
};

export default LoadingComponent;
