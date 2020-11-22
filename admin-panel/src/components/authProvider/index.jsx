const authProvider = {
  login: ({ username, password }) => {
    const email = username;
    const request = new Request('http://localhost:3001/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(auth => {
        localStorage.setItem('user', JSON.stringify(auth));
      })
      .catch(() => {
        throw new Error('Network error');
      });
  },
  checkError: error => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('user');
      return Promise.reject({ redirectTo: '/credentials-required' });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem('user')
      ? Promise.resolve()
      : Promise.reject({ redirectTo: '/no-access' }),
  logout: () => {
    localStorage.removeItem('user');
    return Promise.resolve();
  },
  getPermissions: () => {
    const role = localStorage.getItem('permissions');
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
