import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';
import EventDetailedChatForm from './EventDetailedChatForm';

import {
  Comment,
  Header,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';

class EventDetailedChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCommentId: null,
      showReplyForm: false,
    };

    this.handleCloseReplyForm = this.handleCloseReplyForm.bind(this);
    this.handleOpenReplyForm = this.handleOpenReplyForm.bind(this);
  }

  handleCloseReplyForm() {
    //  return () => {
    this.setState({
      selectedCommentId: null,
      showReplyForm: false,
    });
    //  };
  }

  handleOpenReplyForm(id) {
    return () => {
      this.setState({
        selectedCommentId: id,
        showReplyForm: true,
      });
    };
  }

  render() {
    const {
      eventChat,
      eventId,
      addEventComment,
    } = this.props;
    const {
      selectedCommentId,
      showReplyForm,
    } = this.state;

    return (
      <div>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: 'none' }}
        >
          <Header>Chat about this event</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {
              eventChat && eventChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || '/assets/user.png'}
                  />
                  <Comment.Content>
                    <Comment.Author
                      as={Link}
                      to={`/profile/${comment.uid}`}
                    >
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>
                        {distanceInWords(comment.date, Date.now())}
                        {' ago'}
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>
                      {comment.text}
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.handleOpenReplyForm(comment.id)}
                      >
                        Reply
                      </Comment.Action>
                      {
                        showReplyForm
                        && selectedCommentId === comment.id
                        && (
                          <EventDetailedChatForm
                            addEventComment={addEventComment}
                            closeForm={this.handleCloseReplyForm}
                            eventId={eventId}
                            form={`reply_${comment.id}`}
                            parentId={comment.id}
                          />
                        )
                      }
                    </Comment.Actions>
                  </Comment.Content>
                  {/* Replies - Start */}
                  {
                    comment.childNodes
                    && (
                      comment.childNodes.map(child => (
                        <Comment.Group key={child.id}>
                          <Comment>
                            <Comment.Avatar
                              src={child.photoURL || '/assets/user.png'}
                            />
                            <Comment.Content>
                              <Comment.Author
                                as={Link}
                                to={`/profile/${child.uid}`}
                              >
                                {child.displayName}
                              </Comment.Author>
                              <Comment.Metadata>
                                <div>
                                  {distanceInWords(child.date, Date.now())}
                                  {' ago'}
                                </div>
                              </Comment.Metadata>
                              <Comment.Text>
                                {child.text}
                              </Comment.Text>
                              <Comment.Actions>
                                <Comment.Action
                                  onClick={this.handleOpenReplyForm(child.id)}
                                >
                                  Reply
                                </Comment.Action>
                                {
                                  showReplyForm
                                  && selectedCommentId === child.id
                                  && (
                                    <EventDetailedChatForm
                                      addEventComment={addEventComment}
                                      closeForm={this.handleCloseReplyForm}
                                      eventId={eventId}
                                      form={`reply_${child.id}`}
                                      parentId={child.parentId}
                                    />
                                  )
                                }
                              </Comment.Actions>
                            </Comment.Content>
                          </Comment>
                        </Comment.Group>
                      ))
                    )
                  }
                  {/* Replies - End */}
                </Comment>
              ))
            }
          </Comment.Group>
          <EventDetailedChatForm
            addEventComment={addEventComment}
            eventId={eventId}
            form="newComment"
            parentId={0}
          />
        </Segment>
      </div>
    );
  }
}

EventDetailedChat.defaultProps = {
  eventChat: [],
  eventId: '',
};

EventDetailedChat.propTypes = {
  addEventComment: PropTypes.func.isRequired,
  eventChat: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  eventId: PropTypes.string,
};

export default EventDetailedChat;
