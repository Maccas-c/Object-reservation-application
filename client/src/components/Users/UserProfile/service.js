import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useStyles from './styles';

export const useUserProfileService = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [sex, setSex] = useState('');
  const [nip, setNIP] = useState('');

  const userProfile = useSelector(({ usersList }) => usersList.user);
  const isLoading = useSelector(({ utils }) => utils.isLoading);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setSurname(userProfile.surname);
      setEmail(userProfile.email);
      setPhoneNumber(userProfile.phone_number);
      setAge(userProfile.age);
      setCity(userProfile.adress_city);
      setStreet(userProfile.adress_street);
      setPostalCode(userProfile.adress_postalCode);
      setNIP(userProfile.nip);

      userProfile.sex === 'male' ? setSex('Mężczyzna') : setSex('Kobieta');
    }
  }, [userProfile]);

  return {
    classes,
    name,
    surname,
    email,
    phoneNumber,
    age,
    city,
    street,
    postalCode,
    sex,
    nip,
    isLoading,
  };
};
