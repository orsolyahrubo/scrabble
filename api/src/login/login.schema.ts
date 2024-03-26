import * as yup from 'yup';

export const loginUserSchema = yup
    .object({
        email: yup.string().required().email(),
        password: yup.string().required()
    })
    .required();