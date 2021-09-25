import * as yup from "yup";

export const LFSchema=yup.object().shape({
    login:yup.string().required().min(4).max(15),
    password:yup.string().min(4).max(15).required(),
})

