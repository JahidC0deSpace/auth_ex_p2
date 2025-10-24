import { toast } from "react-hot-toast"

import {authenticate} from "./helper.js"

// validate login page
export async function usernameValidate(values) {
    const errors =usernameVerify({},values);
    if (values.username) {
        //check user existance
        const {status}= await authenticate(values.username);

        if (status!==200) {
            errors.exist=toast.error('User Does Not Exist');
        }
    }
    return errors;
}

//validate password page
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);

    return errors;
}

//validate reset password
export async function resetPasswordValidate(values) {
    const errors =passwordVerify({},values);
    if (values.password!==values.confirm_pwd) {
        errors.exist=toast.error("Password Not Match..")
    }
    return errors;
}

//validate register form
export async function registerValidate(values) {
    const errors=usernameVerify({},values);
    passwordVerify(errors,values);
    emailVerify(errors,values)
    
    return errors;
}


//validate profile page
export async function profileValidate(values) {
    const errors= emailVerify({},values);
    return errors;
}
///**************** */
//validate password

function passwordVerify(errors={},values) {
      /* eslint-disable no-useless-escape */
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;


    if (!values.password) {
        errors.password=toast.error("Password Required....!");
    }
    else if (values.password.includes(" ")) {
        errors.password=toast.error("Wrong Password");
    }
    else if (values.password.length<5) {
        errors.password=toast.error("Password Must Be More Then 5 Characters Long"); 
    } else if (!specialChars.test(values.password)) {
        errors.password=toast.error("Password Must Have Special Character"); 
    }

    return errors;
}

// validate Username
function usernameVerify(error={},values) {
    if (!values.username) {
        error.username=toast.error("Username Required....!");
    }
    else if (values.username.includes(" ")) {
        error.username=toast.error("Invalid Username");
    }

    return error;
}
//validate email
function emailVerify(error={},values) {
    if (!values.email) {
        error.email=toast.error("Email Required....!");
    }
    else if (values.email.includes(" ")) {
        error.email=toast.error("Invalid Email");
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email=toast.error("Invalid Email Adress...");
    }

    return error;
}