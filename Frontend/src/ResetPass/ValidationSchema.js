import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    password: yup
        .string()
        .required("This field is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[\W_]/, "Password must contain at least one special character (e.g., @, #, $, %, etc.)"),
    Cpassword: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required("This field is required")
});
