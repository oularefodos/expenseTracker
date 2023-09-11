import * as yup from 'yup'

export const signupSchema = yup.object().shape({
    name : yup.string().max(30, "require less than 30 character").required("Name is required"),
    email : yup.string().max(30, "require less than 30 character").email('this has to be an email').required("Email is required"),
    password : yup.string().min(8, "require more than 8").required("Name is required"),
});

export const loginSchema = yup.object().shape({
    email : yup.string().max(30, "require less than 30 character").email('this has to be an email').required("Email is required"),
    password : yup.string().min(8, "require more than 8").required("Name is required"),
});