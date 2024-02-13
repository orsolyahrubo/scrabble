import * as yup from 'yup';

const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;

export const registerUserSchema = yup
    .object({
        name: yup.string().required().trim().min(2).max(50),
        email: yup.string().required().email(),
        password: yup.string().required().matches(PASSWORD_REGEX, 'password must contain only letters and numbers with a minimum of 8 characters'),
    })
    .required();