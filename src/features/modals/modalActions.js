import { MODAL_CLOSE, MODAL_OPEN } from './modalConstants';

export const closeModal = () => ({
  type: MODAL_CLOSE,
});

export const openModal = (modalType, modalProps) => ({
  type: MODAL_OPEN,
  payload: {
    modalType,
    modalProps,
  },
});
