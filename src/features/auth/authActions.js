import { reset, SubmissionError } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { closeModal } from '../modals/modalActions';

export const login = creds => (
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(
          creds.email,
          creds.password,
        );
      dispatch(closeModal());
    } catch (error) {
      console.error('error report: ', { error });

      throw new SubmissionError({
        _error: error.message,
      });
    }
  });

export const registerUser = user => (
  async (
    dispatch,
    getState,
    {
      getFirebase,
      getFirestore,
    },
  ) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
      // create the user in auth
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          user.email,
          user.password,
        );

      console.log(createdUser);

      // update the firebase auth profile
      /*
        await createdUser.updateProfile({
          displayName: user.displayName,
        });

        NOTE: the above code causes 'updateProfile is not a function'
      */

      createdUser = await firebase.auth().currentUser;

      if (createdUser != null) {
        createdUser.updateProfile({
          displayName: user.displayName,
        });
      }

      // create new profile in firestore
      const newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore.set(
        `users/${createdUser.uid}`,
        { ...newUser },
      );

      dispatch(closeModal());
    } catch (error) {
      console.error('error report:', { error });

      throw new SubmissionError({
        _error: error.message,
      });
    }
  });

export const socialLogin = selectedProvider => (
  async (
    dispatch,
    getState,
    {
      getFirebase,
      getFirestore,
    },
  ) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
      dispatch(closeModal());
      let user = await firebase.login({
        provider: selectedProvider,
        type: 'popup',
      });

      if (user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error Report: ', { error });
    }
  });

export const updatePassword = creds => (
  async (
    dispatch,
    getState,
    {
      getFirebase,
    },
  ) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;

    try {
      await user.updatePassword(creds.newPassword1);
      await dispatch(reset('account'));
      toastr.success('Success', 'Your password has been changed.');
    } catch (error) {
      throw new SubmissionError({
        _error: error.message,
      });
    }
  });
