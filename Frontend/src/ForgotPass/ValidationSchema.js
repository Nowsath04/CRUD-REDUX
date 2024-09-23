import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("This field is required")
});
