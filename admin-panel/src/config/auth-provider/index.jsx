import * as Cookies from 'js-cookie';

const authProvider = {
  login: async function ({ username, password }) {
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
        localStorage.setItem('token', process.env.REACT_APP_SECRET);
      })
      .catch(() => {
        throw new Error('Nie jesteś adminem');
      });
  },
  checkError: (error) => {
    const { status } = error;

    if (status === 401 || status === 403) {
      localStorage.removeItem('token');

      return Promise.reject({ redirectTo: '/admin' });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () => {
    if (localStorage.getItem('token') == process.env.REACT_APP_SECRET) return Promise.resolve();
    else return Promise.reject({ redirectTo: '/login' });
  },
  logout: async function () {
    const request = new Request('http://localhost:3001/api/logout', {
      method: 'GET',
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
        localStorage.removeItem('token');
      })
      .catch(() => {
        throw new Error('Wylogowano');
      });

    return Promise.resolve();
  },
  getPermissions: () => {
    return Promise.resolve();
  },
  getIdentity: () => {
    return Promise.resolve();
  },
};

export default authProvider;
