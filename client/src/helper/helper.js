import axios from "axios";
import jwtDecode from "jwt-decode";
axios.defaults.baseURL = 'http://localhost:8080';

// *** Make a API Request ***

//get userName from Token
export async function getuserName(){
    const token = localStorage.getItem('token');
    if(!token) return Promise.reject("Cann't have a Token");
    let decode = jwtDecode(token);
    return decode;
}
// //

// export async function getuserDetails(){
//     const token = localStorage.getItem('token');
//     if(!token) return Promise.reject("Cann't have a Token");
//     let decode = jwtDecode(token);
//     const{username} = decode;

//     const {data} = await axios.get(`/api/getUser/${username}`);
//     let test = Promise.resolve(data)
//     console.log(test)

// }
//

// Authentication Function
export async function authenticate(username){

    try {
        return await axios.post('/api/authenticate', {username})
    } catch (error) {
        return {error: "Username doesn't exist"}
    }

}

// Get User deatails
export async function getUser({username}){
    try {
        const { data  } = await axios.get(`/api/getUser/${username}`);
        
        return {data};

    } catch (error) {
        return {error:"Username not matched"}
    }

}

// Register the User
export async function registerUser(credentials){

    try {
        const {data : { msg }, status} = await axios.post(`/api/register`, credentials);

        let {username, email} = credentials;

        //send e-mail to the user
        if(status === 201){
            await axios.post(`/api/registerMail`, {username, email, text : msg})
        }

        return Promise.resolve(msg);

    } catch (error) {
        return Promise.reject({ error });
    }

}

// user login
export async function login({username, password}){
    try {
        if(username){
            const { data } = await axios.post('/api/login', {username, password});
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Username or Password doesn't Match..!"})
    }
}

// update user function
export async function updateUser(response){
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateUser', response, {headers : {"Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data });

    } catch (error) {
        return Promise.reject({error : "Couldn't Update the User..!"})
    }
}

// generate OTP
export async function generateOTP(username){
   
    try {
        const { data : { code } , status} = await axios.get('/api/generateOTP', {params : { username }});

        // send mail with OTP
        if(status === 201){
            
            //call to get user Function
            let  { data : {email} }   = await getUser({username});
            
            //console.log(email)
           
            let text = `Your Password Recovery OTP is ${code}. Verify and recover Your Password..!`;
            
            await axios.post(`/api/registerMail`, {username, email, text, subject:"Password Recovery OTP"})
        }
        
        return Promise.resolve(code);

    } catch (error) {
        return Promise.reject({error});
    }
}

// verify the OTP
export async function verifyOTP({username, code}){
    console.log(username)
    try {
        const { data, status } = await axios.get('/api/verifyOTP', {params : { username, code }});
        return {data, status}
    } catch (error) {
        return Promise.reject({error});
    }
}

// reset the Password
export async function resetPass({username, password}){
    
    try {
        const {data, status} = await axios.put('/api/resetPassword', {username, password});
        return Promise.resolve({ data, status });

    } catch (error) {
        return Promise.reject({error})
    } 
}