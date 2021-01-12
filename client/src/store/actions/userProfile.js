import axios from 'axios/axios-auth';
import { showMessage } from '../../app/store/fuse/messageSlice';
import { setUserData } from '../../app/auth/store/userSlice';

export const updateUserProfileStart = user => {
	return dispatch => {
		axios
			.patch('/user/update', user, {
				withCredentials: true
			})
			.then(response => {
				dispatch(showMessage({ message: 'Pomyślnie zmieniono dane' }));
				dispatch(setUserData(response.data));
			})
			.catch(error => {
				console.log(error.response);
				dispatch(showMessage({ message: 'Błąd autoryzacji, zostałeś wylogowany.' }));
			});
	};
};
