const authProvider = {
  login: ({ username, password }) => {
    const email = username;
    const request = new Request('http://localhost:3001/api/login/admin', {
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
        localStorage.setItem('admin', JSON.stringify(auth));
        localStorage.setItem('permissions', JSON.stringify(auth.role));
        localStorage.setItem('token', process.env.REACT_APP_SECRET);
      })
      .catch(() => {
        throw new Error('You are not admin');
      });
  },
  checkError: (error) => {
    const { status } = error;

    if (status === 401 || status === 403) {
      localStorage.removeItem('admin');
      localStorage.removeItem('permissions');
      return Promise.reject({ redirectTo: '/credentials-required' });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () => {
    if (localStorage.getItem('token') == process.env.REACT_APP_SECRET) return Promise.resolve();
    else return Promise.reject({ redirectTo: '/login' });
  },
  logout: () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    return Promise.resolve();
  },
  getPermissions: () => {
    const role = localStorage.getItem('permissions');
    return role ? Promise.resolve(role) : Promise.reject();
  },
  getIdentity: () => {
    try {
      if (localStorage.getItem('admin')) {
        const { id, name, surname } = JSON.parse(localStorage.getItem('admin'));
        return Promise.resolve({ id, name });
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default authProvider;
