export const initialValuesRegister = {
    email: '',
    name: '',
    surname: '',
    sex: '',
    password: '',
}

export const userProfileTransform = apiData => ({
    id: apiData._id,
    name: apiData.name,
    surname: apiData.surname,
    email: apiData.email,
    phone_number: apiData.phone_number,
    age: apiData.age,
    adress_city: apiData.adress_city,
    adress_postalCode: apiData.adress_postalCode,
    adress_street: apiData.adress_street,
    sex: apiData.sex,
    nip: apiData.nip


});
