import PropTypes from 'prop-types';
import React from 'react';
import {
  Header,
  Image,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';
import LazyLoad from 'react-lazyload';

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
                  <LazyLoad
                    height={150}
                    key={photo.id}
                    placeholder={
                      (
                        <Image
                          src={'/assets/user.png'}
                          alt=""
                        />
                      )
                    }
                  >
                    <Image
                      src={photo.url}
                      alt=""
                    />
                  </LazyLoad>
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
