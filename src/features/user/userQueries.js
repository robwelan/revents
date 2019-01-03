const userDetailedQuery = ({ auth, userUid, match }) => {
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
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{ collection: 'following', doc: match.params.id }],
        storeAs: 'following',
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
