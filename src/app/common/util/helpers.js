import moment from 'moment';

export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map(
      e => Object.assign(e[1], { id: e[0] }),
    );
  }
};

export const createNewEvent = (user, photoURL, event) => {
  const momentEventDate = moment(event.date).toDate();
  const nowDT = Date.now();
  const photo = photoURL || '/assets/user.png';

  return {
    ...event,
    date: momentEventDate,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photo,
    created: nowDT,
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: nowDT,
        photoURL: photo,
        displayName: user.displayName,
        host: true,
      },
    },
  };
};

export const objectHasKey = (o, k) => {
  let check = false;

  check = Object.prototype.hasOwnProperty.call(o, k);

  return check;
};
