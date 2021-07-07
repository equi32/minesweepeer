const isJwtTokenStored = () =>
  sessionStorage.token && sessionStorage.token !== '';

const getJwtToken = () => (isJwtTokenStored() ? sessionStorage.token : null);

const setJwtToken = jwtToken => sessionStorage.setItem('token', jwtToken);

const removeJwtToken = () => sessionStorage.removeItem('token');

const getHeaders = () => ({
  Authorization: isJwtTokenStored() ? `Bearer ${getJwtToken()}` : '',
});

export {
  isJwtTokenStored,
  getJwtToken,
  setJwtToken,
  removeJwtToken,
  getHeaders,
};