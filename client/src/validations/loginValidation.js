import toast from 'react-hot-toast'

//login validation
export async function userLoginValidate(values){
    const u_errors = userNameVerify({}, values)
    const p_errors = passwordVerify({}, values)

    const errors = (u_errors, p_errors);
       
    return errors;
}

//reset password
export async function resetPasswordValidate(values){
    const error = passwordVerify({}, values);

    if(values.password !== values.confirm_pass){
        error.exist = toast.error('Password Not Matched...!')
    }

    return error;
}
//Registration
export async function registationValidation(values){
    const error = userNameVerify({},values)
    passwordVerify({}, values)
    emailVerify({}, values)

    return error;
}
//Profile Validation
export async function profileValidation(values){
    const error = passwordVerify({}, values)

    return error;
}

//-------------------------------------------------------------

// validate username
function userNameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("User Name Required...!");
    }else if(values.username.includes(" ")){
        error.username = toast.error("User Name is Invalid...!");
    }
    return error;
}
//validate password
function passwordVerify(error = {}, values){
    
    const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        error.password = toast.error("Password Required...!")
    }else if(values.password.includes(" ")){
        error.password = toast.error("Password is Invalid...!")
    }else if(values.password.length < 6){
        error.password = toast.error("Password must be more than 6 caracters")
    }else if(!special.test(values.password)){
        error.password = toast.error("Password must have special character")
    }
}
//validate email
function emailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error('Email must be Require...!')
    }else if(values.email.includes(" ")){
        error.password = toast.error("Email is Invalid...!")
    }
    return error;
}