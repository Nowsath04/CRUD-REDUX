import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    FirstName: yup.string().required("This field is required"),
    LastName: yup.string().required("This field is required"),
    Role: yup.string().required("This field is required"),
    DOB: yup.string().required("This field is required"),
    Gender: yup.string().required("This field is required"),
    Email: yup.string().email("Invalid email format").required("This field is required"),
    Mobile: yup.number().required("This field is required")
});
