import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Zbyt krótkie imię').max(50, 'Nieodpowiednia długość!'),
	surname: Yup.string().min(2, 'Zbyt krótkie nazwisko!').max(50, 'Nieodpowiednia długość!'),
	password: Yup.string().matches(
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
		'Hasło musi się składać z co najmniej 6 i co najwyżej 20 znaków. Prawidłowe hasło musi zawierać co najmniej jedną małą literę, co najmniej jedna duża literę, jeden znak specjalny oraz jedną cyfrę.'
	)
});

export const userProfileEdit = {
	nipError: 'Przykładowy format: XXX-XXX-XX-XX lub XXX-XX-XX-XXX',
	adress_postalCode: 'Przykładowy format: XX-XXX',
	phone_number: 'Przykładowy format XXX-XXX-XXX lub XXXXXXXXX',
	age: 'Wiek musi być z zakresu od 0 do 99 lat '
};
