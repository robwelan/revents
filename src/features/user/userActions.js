import moment from 'moment';
import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncActions';

const isValidDate = (date) => {
  const d = moment(date);
  if (d == null || !d.isValid()) return false;

  const tosDate = date.toString();
  const tosD = d.toString();

  if (!tosD.indexOf(tosDate)) return false;

  return true;
};

export const updateProfile = user => (
  async (
    dispatch,
    getState,
    { getFirebase },
  ) => {
    const firebase = getFirebase();
    const {
      isLoaded,
      isEmpty,
      ...updatedUser
    } = user;

    const storeBirthDate = getState().firebase.profile.dateOfBirth;
    const userBirthDate = updatedUser.dateOfBirth;

    if (userBirthDate !== storeBirthDate) {
      const newBirthDate = moment(userBirthDate).toDate();

      if (typeof (storeBirthDate) === 'undefined') {
        // birth date has never been entered prior to this...
        updatedUser.dateOfBirth = newBirthDate;
      }

      if (typeof (storeBirthDate) !== 'undefined' && isValidDate(newBirthDate)) {
        updatedUser.dateOfBirth = newBirthDate;
      }
      // else {
      //       throw new Error('Could not generate birth date from updated user.');
      // delete field or throw error?
      //        }
    }

    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Success', 'Your profile has been updated.');
    } catch (error) {
      console.error('Error Report: ', { error });
    }
  });

export const uploadProfileImage = (file, fileName) => (
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      name: imageName,
    };

    try {
      dispatch(asyncActionStart());
      // upload file to firebase storage
      const uploadedFile = await firebase.uploadFile(path, file, null, options);
      // get url of image
      const downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      // get userdoc from firestore
      const userDoc = await firestore.get(`users/${user.uid}`);
      // check if user has photo, if not, update profile with new image
      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({
          photoURL: downloadURL,
        });
        await user.updateProfile({
          photoURL: downloadURL,
        });
      }

      // add the new photo to photos collection
      await firestore.add(
        {
          collection: 'users',
          doc: user.uid,
          subcollections: [{ collection: 'photos' }],
        },
        {
          name: imageName,
          url: downloadURL,
        },
      );

      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      throw new Error('Problem uploading photo');
    }
  }
);

export const deletePhoto = photo => (
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete(
        {
          collection: 'users',
          doc: user.uid,
          subcollections: [
            {
              collection: 'photos',
              doc: photo.id,
            },
          ],
        },
      );
    } catch (error) {
      console.log(error);
      throw new Error('Problem deleting the photo');
    }
  }
);

export const setMainPhoto = photo => (
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      return await firebase.updateProfile(
        {
          photoURL: photo.url,
        },
      );
    } catch (error) {
      console.log(error);
      throw new Error('Problem setting main photo');
    }
  }
);

export const goingToEvent = event => (
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const { photoURL } = getState().firebase.profile;
    const attendee = {
      displayName: user.displayName,
      going: true,
      host: false,
      joinDate: Date.now(),
      photoURL: photoURL || '/assets/user.png',
    };

    try {
      await firestore.update(
        `events/${event.id}`,
        {
          [`attendees.${user.uid}`]: attendee,
        },
      );
      await firestore.set(
        `event_attendee/${event.id}_${user.uid}`,
        {
          eventId: event.id,
          userUid: user.uid,
          eventDate: event.date,
          host: false,
        },
      );
      toastr.success('Success', 'You have signed up to the event');
    } catch (error) {
      console.error(error);
      toastr.error('Oops', 'Problem signing up to event');
    }
  }
);

export const cancelGoingToEvent = event => (
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
      await firestore.update(
        `events/${event.id}`,
        {
          [`attendees.${user.uid}`]:
            firestore.FieldValue.delete(),
        },
      );
      await firestore.delete(
        `event_attendee/${event.id}_${user.uid}`,
      );
      toastr.success('Success', 'You have removed yourself from the Event');
    } catch (error) {
      console.error(error);
      toastr.error('Oops', 'Something went wrong');
    }
  }
);
