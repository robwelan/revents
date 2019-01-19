import React from 'react';
import { connect } from 'react-redux';
import TestModal from './TestModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import UnauthModal from './UnauthModal';

const mapState = state => ({
  currentModal: state.modals,
});

const modalLookup = {
  LoginModal,
  RegisterModal,
  TestModal,
  UnauthModal,
};

const ModalManager = ({ currentModal }) => {
  let renderedModal = null;

  if (currentModal) {
    const { modalProps, modalType } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
};

export default connect(mapState)(ModalManager);
