import axios from "axios";

const LOGIN = "/api/login";
const SIGNUP = "/api/signup"

function login(user) {
    return sendRequest(user, LOGIN);
}

function signup(user) {
    return sendRequest(user, SIGNUP);
}

function sendRequest(user, actionPath) {
    console.log("UserService - " + actionPath + ": " + user)
    const headers = {
        "Content-Type": "application/json"
        // Authorization: "JWT fefege..."
    };
    return axios
        .post(actionPath, user, { headers: headers })
        .then(response => {
            console.log("Got " + actionPath + " response: " + response.data.authorized);
            const authorized = response.data.authorized;
            user.authorized = authorized;
            console.log("user response: " + user.email +" " + user.authorized);
            return user;
        })
        .then(user => {
            console.log("UserServices local storage user response: " + user.email +" " + user.authorized);
            if (user.authorized) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return {email: user.email, authorized: user.authorized};
        })
        .catch(error => {
            // alert("Log in Error");
            console.log("Something wrong: " + error);
        });
}

export const userLogin = {
    login,
    signup
}