import moment from 'moment';
import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncActions';
import firebase from '../../app/config/firebase';
import { FETCH_EVENTS } from '../events/eventConstants';

const isValidDate = (date) => {
  const d = moment(date);
  if (d == null || !d.isValid()) return false;

  const tosDate = date.toString();
  const tosD = d.toString();

  if (!tosD.indexOf(tosDate)) return false;

  return true;
};

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase },
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;

  const storeBirthDate = getState().firebase.profile.dateOfBirth;
  const userBirthDate = updatedUser.dateOfBirth;

  if (userBirthDate !== storeBirthDate) {
    const newBirthDate = moment(userBirthDate).toDate();

    if (typeof storeBirthDate === 'undefined') {
      // birth date has never been entered prior to this...
      updatedUser.dateOfBirth = newBirthDate;
    }

    if (typeof storeBirthDate !== 'undefined' && isValidDate(newBirthDate)) {
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
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
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
    console.error(error);
    dispatch(asyncActionError());
    throw new Error('Problem uploading photo');
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [
        {
          collection: 'photos',
          doc: photo.id,
        },
      ],
    });
  } catch (error) {
    console.error(error);
    throw new Error('Problem deleting the photo');
  }
};

export const setMainPhoto = photo => async (dispatch, getState) => {
  dispatch(asyncActionStart());

  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const today = new Date(Date.now());
  const userDocRef = firestore.collection('users').doc(user.uid);
  const eventAttendeeRef = firestore.collection('event_attendee');

  try {
    const batch = firestore.batch();

    await batch.update(userDocRef, {
      photoURL: photo.url,
    });

    const eventQuery = await eventAttendeeRef
      .where('userUid', '==', user.uid)
      .where('eventDate', '>', today);

    const eventQuerySnap = await eventQuery.get();

    for (let i = 0; i < eventQuerySnap.docs.length; i += 1) {
      const eventDocRef = await firestore
        .collection('events')
        .doc(eventQuerySnap.docs[i].data().eventId);
      const event = await eventDocRef.get();

      if (event.data().hostUid === user.uid) {
        batch.update(eventDocRef, {
          hostPhotoURL: photo.url,
          [`attendees.${user.uid}.photoURL`]: photo.url,
        });
      } else {
        batch.update(eventDocRef, {
          [`attendees.${user.uid}.photoURL`]: photo.url,
        });
      }
    }

    await batch.commit();

    dispatch(asyncActionFinish());
  } catch (error) {
    console.error(error);
    dispatch(asyncActionError());
    throw new Error('Problem setting main photo');
  }
};

export const goingToEvent = event => async (dispatch, getState) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const { profile } = getState().firebase;
  const attendee = {
    displayName: profile.displayName,
    going: true,
    host: false,
    joinDate: Date.now(),
    photoURL: profile.photoURL || '/assets/user.png',
  };

  try {
    const eventDocRef = firestore.collection('events').doc(event.id);
    const eventAttendeeDocRef = firestore
      .collection('event_attendee')
      .doc(`${event.id}_${user.uid}`);

    await firestore.runTransaction(async (transaction) => {
      await transaction.get(eventDocRef);

      await transaction.update(eventDocRef, {
        [`attendees.${user.uid}`]: attendee,
      });

      await transaction.set(eventAttendeeDocRef, {
        eventId: event.id,
        userUid: user.uid,
        eventDate: event.date,
        host: false,
      });
    });

    dispatch(asyncActionFinish());
    toastr.success('Success', 'You have signed up to the event');
  } catch (error) {
    dispatch(asyncActionError());
    console.error(error);
    toastr.error('Oops', 'Problem signing up to event');
  }
};

export const cancelGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete(),
    });
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);

    toastr.success('Success', 'You have removed yourself from the Event');
  } catch (error) {
    console.error(error);
    toastr.error('Oops', 'Something went wrong');
  }
};

const returnEvent = async (firestore, docs) => {
  const event = await firestore
    .collection('events')
    .doc(docs.data().eventId)
    .get();

  return {
    ...event.data(),
    id: event.id,
  };
};

const returnEvents = async (firestore, querySnap) => {
  const events = querySnap.docs.map(event => returnEvent(firestore, event));

  return (await Promise.all(events)) || null;
};

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    const today = new Date(Date.now());
    const eventsRef = firestore.collection('event_attendee');
    let query;

    switch (activeTab) {
      case 1: // past events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('eventDate', '<=', today)
          .orderBy('eventDate', 'desc');
        break;
      case 2: // future events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('eventDate', '>=', today)
          .orderBy('eventDate');
        break;
      case 3: // hosted events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('host', '==', true)
          .orderBy('eventDate', 'desc');
        break;
      default:
        query = eventsRef
          .where('userUid', '==', userUid)
          .orderBy('eventDate', 'desc');
    }
    const querySnap = await query.get();
    const payloadEvents = await returnEvents(firestore, querySnap);

    await Promise.all(payloadEvents).then((events) => {
      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionFinish());
    });
  } catch (error) {
    console.error(error);
    dispatch(asyncActionError());
  }
};

export const followUser = userToFollow => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const following = {
    photoURL: userToFollow.photoURL || '/assets/user.png',
    city: userToFollow.city || 'Unknown City',
    displayName: userToFollow.displayName,
  };

  try {
    await firestore.set(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [
          {
            collection: 'following',
            doc: userToFollow.id,
          },
        ],
      },
      following,
    );
  } catch (error) {
    console.error(error);
  }
};

export const unfollowUser = userToUnfollow => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  const user = firebase.auth().currentUser;

  try {
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'following', doc: userToUnfollow.id }],
    });
  } catch (error) {
    console.error(error);
  }
};
