import moment from 'moment';
import { toastr } from 'react-redux-toastr';

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
      console.log(newBirthDate)
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
