import Immutable from 'immutable';

export default token => {
  const options = { headers: { Authorization: `Bearer ${token}` } };

  return new Promise((resolve, reject) =>
    Promise.all([
      fetch(`${process.env.REACT_APP_PUBLIC_URL}/camps`, options).then(
        res => (res.status !== 200 ? reject(res) : res.json())
      ),
      // fetch(`${process.env.REACT_APP_PUBLIC_URL}/api/uploads.json', options)
      //   .then(res => (res.status !== 200 ? reject(res) : res.json())),
      fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/camp-activities`,
        options
      ).then(res => (res.status !== 200 ? reject(res) : res.json())),
      fetch(`${process.env.REACT_APP_PUBLIC_URL}/camp-regions`, options).then(
        res => (res.status !== 200 ? reject(res) : res.json())
      ),
      fetch(`${process.env.REACT_APP_PUBLIC_URL}/camp-types`, options).then(
        res => (res.status !== 200 ? reject(res) : res.json())
      ),
      fetch(`${process.env.REACT_APP_PUBLIC_URL}/periods`, options).then(
        res => (res.status !== 200 ? reject(res) : res.json())
      )
    ])
      .then(([camps, activities, places, types, periods]) =>
        resolve(
          Immutable.fromJS({
            camps,
            activities,
            places,
            types,
            periods
          })
        ))
      .catch(error => reject(error)));
};
