export default password => {
  const options = {
    body: JSON.stringify({ email: 'hello@urbica.co', password }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };
  console.log(`${process.env.REACT_APP_PUBLIC_URL}`, 'url');
  console.log(`${process.env.REACT_APP_PUBLIC_URL}`, 'url2');
  console.log(process.env);

  return new Promise((resolve, reject) =>
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/login`, options)
      .then(res => (res.status !== 200 ? reject(res) : res.json()))
      .then(json => resolve(json.token))
      .catch(error => reject(error)));
};
