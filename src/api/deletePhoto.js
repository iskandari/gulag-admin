export default (token, photoId) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) =>
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/photos/${photoId}`, options)
      .then(res => (res.status !== 204 ? reject(res) : resolve(res)))
      .catch(error => reject(error)));
};
