import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import {
  Card,
  Header,
  Image,
  Segment,
  Tab,
} from '../../../frameworks/semantic-ui-react/scripts';

const panes = [
  { menuItem: 'All Events', pane: { key: 'allEvents' } },
  { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
  { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
  { menuItem: 'Hosting', pane: { key: 'hosting' } },
];

const UserDetailedEvents = (props) => {
  const {
    changeTab,
    eventsLoading,
    events,
  } = props;

  return (
    <Segment attached loading={eventsLoading}>
      <Header icon="calendar" content="Events" />

      <Tab
        menu={
          {
            pointing: true,
            secondary: true,
          }
        }
        onTabChange={(e, data) => changeTab(e, data)}
        panes={panes}
      />
      <br />
      <Card.Group itemsPerRow={5}>
        {
          events && events.map((event) => {
            return (
              <Card
                as={Link}
                key={event.id}
                to={`/event/${event.id}`}
              >
                <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign="center">
                    {event.title}
                  </Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(event.date && event.date.toDate(), 'DD MMM YYYY')}</div>
                    <div>{format(event.date && event.date.toDate(), 'h:mm A')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            )
          })
        }
      </Card.Group>
    </Segment>
  );
};

export default UserDetailedEvents;
