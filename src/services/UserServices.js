import axios from "axios";
import { longStackSupport } from "q";
import sendRequest from "@/services/send_request";

const LOGIN = "/api/login";
const SIGNUP = "/api/signup"

function login(user) {
    return sendRequest(user, LOGIN);
}

function signup(user) {
    return sendRequest(user, SIGNUP);
}

function logout() {
    // remove user from local storage to log user out
    console.log("removing user from local storage");
    localStorage.removeItem('user');
}

// function sendRequest(user, actionPath) {
//     console.log("UserService - " + actionPath + ": ", user)
//     const headers = {
//         "Content-Type": "application/json"
//         // Authorization: "JWT fefege..."
//     };
//     return axios
//         .post(actionPath, user, { headers: headers })
//         .then(response => {
//             console.log('====================================');
//             // console.log('reponse ok? ', response.ok);
//             // if (!response.ok) {
//             //     // hmm do I really need it?
//             //     console.log('reponse status: ', response.status)
//             //     if (response.status === 401) {
//             //         logout();
//             //         location.reload(true);
//             //     }
//             //     const error = (data && data.message) || response.statusText;
//             //     console.log('reject - error: ', error);
//             //     return Promise.reject(error);
//             // }
//             console.log("Got " + actionPath + " response: ", response.data);
//             const { password, ...userWithoutPassword } = response.data
//             // user.authorized = response.data.authorized;
//             // user.token = response.data.token;
//             // user.first_name = response.data.first_name;
//             // user.last_name = response.data.last_name;
//             console.log("return user: ", userWithoutPassword);
//             return userWithoutPassword;
//         })
//         .then(user => {
//             console.log("UserServices local storage user response: " + user.email +" " + user.authorized);
//             if (user.authorized) {
//                 localStorage.setItem('user', JSON.stringify(user));
//             }
//             return user;
//         })
//         .catch(error => {
//             // with axios it seems like if status code is not 200 an exception is thrown
//             // alert("Log in Error");
//             console.log("User could get in: " + error);
//             console.log('reponse status: ', error.response.status)
//             // if (error.response.status === 401) {
//             logout();
//             //     location.reload(true);
//             // }
//             const error_msg = (error.response.data && error.response.data.message) || error.response.statusText;
//             console.log('reject - error: ', error_msg);
//             //return Promise.reject(error_msg);
//             throw error_msg;
//         });
//}

export const userLogin = {
    login,
    signup,
    logout
}