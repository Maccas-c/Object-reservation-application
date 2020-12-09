import axios from '../../axios/axios-auth';

import * as actionTypes from './actionTypes';
import {MENU_ROUTES} from '../../constants/routes/routes';

export const loginSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const logout = () => {
    return (dispatch) => {
        axios
            .get(MENU_ROUTES.USER_LOGOUT, {withCredentials: true})
            .then(() => {
                localStorage.removeItem('user');
                dispatch(logoutSuccess());
                dispatch(clearUserProfile());
                dispatch(endLoadingUser());
                dispatch(clearUsersList());
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const fetchReservationUser = (id) => {
    return (dispatch) => {
        axios.get(MENU_ROUTES.LIST_USER_RESERVATION + id, {withCredentials: true})
            .then((response) => {
                dispatch(fetchReservationUserList(response.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export const fetchReservationUserList = (reservation) => {
    return {
        type: actionTypes.FETCH_LIST_RESERVATION_USER,
        reservation: reservation
    }
}

export const logoutUsos = () => {
    return (dispatch) => {
        localStorage.removeItem('user');
        dispatch(logoutSuccess());
        window.location.href = 'http://localhost:3001/api/loginUsos/logout';
        dispatch(clearUserProfile());
        dispatch(endLoadingUser());
        dispatch(clearUsersList());
    };
};

export const authStart = (userInput) => {
    return (dispatch) => {
        axios
            .post(MENU_ROUTES.LOGIN, userInput, {
                withCredentials: true
            })
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                dispatch(loginSuccess(response.data));
            })

            .catch((error) => {
                if (error.response.status === 401) {
                    alert('Niepoprawne Email lub Hasło');
                }
            });
    };
};

export const loadUserToStore = (user) => {
    return {
        type: actionTypes.LOAD_USER,
        user: user
    };
};

export const checkLocalUser = () => {
    return (dispatch) => {
        axios
            .get('/checkAuthUser', {
                withCredentials: true
            })
            .then(() => {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    dispatch(checkUsosUser());
                } else {
                    dispatch(loadUserToStore(user));
                }
                dispatch(endLoadingUser());
            })
            .catch(() => {
                dispatch(checkUserFail());
                dispatch(endLoadingUser());
            });
    };
};

export const checkUser = () => {
    return (dispatch) => {
        dispatch(startLoadingUser());
        dispatch(checkLocalUser());
    };
};

export const checkUsosUser = () => {
    return (dispatch) => {
        axios
            .get('/loginUsos', {
                withCredentials: true
            })
            .then((response) => {
                dispatch(checkUsosUserSuccess(response.data));
            });
    };
};

export const checkUsosUserSuccess = (user) => {
    user.isStudent = true;
    localStorage.setItem('user', JSON.stringify(user));
    return {
        type: actionTypes.CHECK_USOS_USER_SUCCESS,
        user: user
    };
};

export const checkLocalUserSuccess = (user) => {
    user.isStudent = false;
    localStorage.setItem('user', JSON.stringify(user));
};

export const checkUserFail = () => {
    localStorage.removeItem('user');
    return {
        type: actionTypes.CHECK_USER_FAIL
    };
};

export const startLoadingUser = () => {
    return {
        type: actionTypes.START_LOADING_USER
    };
};

export const endLoadingUser = () => {
    return {
        type: actionTypes.END_LOADING_USER
    };
};

export const updateAuthUserSuccess = (updatedUser) => {
    const updatedLocalStorageUser = {
        _id: updatedUser.id,
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
        sex: updatedUser.sex,
        role: updatedUser.role,
        isStudent: updatedUser.isStudent
    };
    localStorage.setItem('user', JSON.stringify(updatedLocalStorageUser));

    return {
        type: actionTypes.CHANGE_AUTH_USER,
        user: updatedLocalStorageUser
    };
};

export const updateAuthUserStart = (updatedUser) => {
    return (dispatch) => {
        dispatch(clearUserProfile());
        dispatch(updateAuthUserSuccess(updatedUser));
    };
};

export const clearUserProfile = () => {
    return {
        type: actionTypes.CLEAR_USER_PROFILE
    };
};

export const clearUsersList = () => {
    return {
        type: actionTypes.CLEAR_USERS_LIST
    };
};
export const fetchTrafficCourtPrize = () => {
    return (dispatch) => {
        axios.get(MENU_ROUTES.PRIZE_LIST, {withCredentials: true})
            .then((response) => {
                dispatch(fetchTrafficCourt(response.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const fetchTrafficCourt = (traffic) =>{
    return {
        type:actionTypes.FETCH_TRAFFIC_COURT,
        traffic:traffic
    }
}