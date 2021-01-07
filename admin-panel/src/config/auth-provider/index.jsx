const authProvider = {
  login: ({ username, password }) => {
    const email = username;
    const request = new Request('http://devcourt.projektstudencki.pl/api/login/admin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem('user', JSON.stringify(auth));
        localStorage.setItem('permissions', JSON.stringify(auth.role));
      })
      .catch(() => {
        throw new Error('You are not admin');
      });
  },
  checkError: (error) => {
    const { status } = error;

    if (status === 401 || status === 403) {
      localStorage.removeItem('user');
      localStorage.removeItem('permissions');
      return Promise.reject({ redirectTo: '/credentials-required' });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () => (localStorage.getItem('user') ? Promise.resolve() : Promise.reject({ redirectTo: '/login' })),
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');
    return Promise.resolve();
  },
  getPermissions: () => {
    const role = localStorage.getItem('permissions');
    return role ? Promise.resolve(role) : Promise.reject();
  },
  getIdentity: () => {
    try {
      const { id, name, surname } = JSON.parse(localStorage.getItem('user'));
      return Promise.resolve({ id, name });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default authProvider;
