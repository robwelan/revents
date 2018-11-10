import PropTypes from 'prop-types';
import React from 'react';
import {
  Icon,
  Item,
  Header,
  List,
} from '../../../frameworks/semantic-ui-react/scripts';

const UserDetailedInterests = (props) => {
  const { interests } = props;

  return (
    <React.Fragment>
      <Header
        content="Interests"
        icon="heart outline"
      />
      {
        interests
          ? (
            <List>
              {
                (
                  interests
                    .sort((a, b) => {
                      let sorted = 0;
                      if (a < b) { sorted = -1; }
                      if (a > b) { sorted = 1; }

                      return sorted;
                    })
                    .map((interest, index) => (
                      <Item
                        /* we will not edit array directly */
                        /* eslint-disable */
                        key={index}
                      >
                        <Icon name="heart" />
                        <Item.Content>
                          {interest}
                        </Item.Content>
                      </Item>
                    ))
                )
              }
            </List>
          )
          :
          (
            <p>
              {'No Interests'}
            </p>
          )
      }
    </React.Fragment>
  );
};

UserDetailedInterests.defaultProps = {
  interests: [],
};

UserDetailedInterests.propTypes = {
  interests: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

export default UserDetailedInterests;
