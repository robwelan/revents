import React from 'react';
import { connect } from 'react-redux';
import { Modal } from '../../frameworks/semantic-ui-react/scripts';
import { closeModal } from './modalActions';

const actions = {
  doCloseModal: closeModal,
};

const TestModal = (props) => {
  const { doCloseModal } = props;

  return (
    <Modal
      closeIcon="close"
      onClose={doCloseModal}
      open
    >
      <Modal.Header>Test Modal</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Test Modal... nothing to see here</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default connect(null, actions)(TestModal);
