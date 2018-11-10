import PropTypes from 'prop-types';
import React from 'react';
import {
  Header,
  Image,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';

const UserDetailedPhotos = (props) => {
  const { photos } = props;

  return (
    <React.Fragment>
      {
        photos
        && photos.length > 0
        && (
          <Segment attached>
            <Header
              content="Photos"
              icon="image"
            />

            <Image.Group
              size="small"
            >
              {
                photos.map(photo => (
                  <Image
                    key={photo.id}
                    src={photo.url}
                    alt=""
                  />
                ))
              }
            </Image.Group>
          </Segment>
        )
      }
    </React.Fragment>
  );
};

UserDetailedPhotos.defaultProps = {
  photos: [],
};

UserDetailedPhotos.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
};

export default UserDetailedPhotos;
