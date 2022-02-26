export default (token, id) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) =>
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/camp-location/${id}`, options)
      .then(res => (res.status !== 200 ? reject(res) : resolve(res.json())))
      .catch(error => reject(error)));
};
