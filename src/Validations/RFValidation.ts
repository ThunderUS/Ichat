import * as yup from "yup";

export const RFSchema=yup.object().shape({
    name: yup.string().required().min(3).max(15) ,
    surname: yup.string().required().min(3).max(15),
    login:yup.string().required().min(4).max(15),
    password:yup.string().required().min(4).max(15),
})