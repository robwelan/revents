import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal, openModal } from './modalActions';
import {
  Button,
  Divider,
  Modal,
} from '../../frameworks/semantic-ui-react/scripts';

const actions = {
  doCloseModal: closeModal,
  doOpenModal: openModal,
};

class UnauthModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    const { doCloseModal, history, location } = this.props;

    if (location.pathname.includes('/event')) {
      doCloseModal();
    } else {
      history.goBack();
      doCloseModal();
    }
  }

  render() {
    const { doOpenModal } = this.props;

    return (
      <Modal onClose={this.handleCloseModal} open size="mini">
        <Modal.Header>You need to be signed in to do that!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Please either login or register to see this page</p>
            <Button.Group widths={4}>
              <Button
                fluid
                color="teal"
                onClick={() => doOpenModal('LoginModal')}
              >
                {'Login'}
              </Button>
              <Button.Or />
              <Button
                fluid
                positive
                onClick={() => doOpenModal('RegisterModal')}
              >
                {'Register'}
              </Button>
            </Button.Group>
            <Divider />
            <div style={{ textAlign: 'center' }}>
              <p>Or click cancel to continue as a guest</p>
              <Button onClick={this.handleCloseModal}>Cancel</Button>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

UnauthModal.propTypes = {
  doCloseModal: PropTypes.func.isRequired,
  doOpenModal: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default withRouter(
  connect(
    null,
    actions,
  )(UnauthModal),
);
