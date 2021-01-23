import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
	name: Yup.string().min(2, 'Zbyt krótkie imię').max(50, 'Nieodpowiednia długość!'),
	surname: Yup.string().min(2, 'Zbyt krótkie nazwisko!').max(50, 'Nieodpowiednia długość!'),
	password: Yup.string().matches(
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
		'Hasło musi się składać z co najmniej 6 i co najwyżej 20 znaków. Prawidłowe hasło musi zawierać co najmniej jedną małą literę, co najmniej jedna duża literę, jeden znak specjalny oraz jedną cyfrę.'
	)
});

export const userProfileEdit = Yup.object().shape({
	nip: Yup.string().matches(
		/^((\d{3}[-]\d{3}[-]\d{2}[-]\d{2})|(\d{3}[-]\d{2}[-]\d{2}[-]\d{3}))$/,
		'Niepoprawny format NIP, przykładowy format: XXX-XXX-XX-XX lub XXX-XX-XX-XXX'
	),
	adress_postalCode: Yup.string().matches(
		/^\d{2}[- ]{0,1}\d{3}$/,
		'	Niepoprawny format kodu pocztowego, przykładowy format: XX-XXX'
	),
	phone_number: Yup.string().matches(
		/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/,
		'Niepoprawny format numeru!'
	),
	age: Yup.string().matches(
		/^([1-9][0-9]?){0,1}$/,
		'Podany wiek jest błędny, wiek musi być z zakresu od 0 do 99 lat '
	),
	email: Yup.string().matches(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		'Niepoprawny format e-mail'
	)
});
