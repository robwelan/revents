import PropTypes from 'prop-types';
import React from 'react';
import {
  reduxForm,
  Field,
} from 'redux-form';
import TextArea from '../../../app/common/form/TextArea';
import {
  Button,
  Form,
} from '../../../frameworks/semantic-ui-react/scripts';

class EventDetailedChatForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleCommentSubmit(values) {
    const {
      addEventComment,
      closeForm,
      eventId,
      parentId,
      reset,
    } = this.props;

    addEventComment(eventId, parentId, values);
    reset();
    if (parentId !== 0) {
      closeForm();
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form
        onSubmit={handleSubmit(this.handleCommentSubmit)}
      >
        <Field
          name="comment"
          type="text"
          component={TextArea}
          rows={2}
        />
        <Button
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    );
  }
}

EventDetailedChatForm.defaultProps = {
  closeForm: null,
};

EventDetailedChatForm.propTypes = {
  addEventComment: PropTypes.func.isRequired,
  closeForm: PropTypes.func,
  eventId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  parentId: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.number,
    ],
  ).isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({ Fields: 'comment' })(EventDetailedChatForm);
