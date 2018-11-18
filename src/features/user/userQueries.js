const userDetailedQuery = ({ auth, userUid }) => {
  let query = [];

  if (userUid !== null) {
    query = [
      {
        collection: 'users',
        doc: userUid,
        storeAs: 'profile',
      },
      {
        collection: 'users',
        doc: userUid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos',
      },
    ];
  } else {
    query = [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [
          {
            collection: 'photos',
          },
        ],
        storeAs: 'photos',
      },
    ];
  }

  return query;
};

export { userDetailedQuery };
