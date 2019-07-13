import axios from "axios";

function sendRequest(user, actionPath) {
    console.log("UserService - " + actionPath + ": ", user)
    const headers = {
        "Content-Type": "application/json"
        // Authorization: "JWT fefege..."
    };
    return axios
        .post(actionPath, user, { headers: headers })
        .then(response => {
            console.log('====================================');
            console.log("Got " + actionPath + " response: ", response.data);
            const { password, ...userWithoutPassword } = response.data
            console.log("return user: ", userWithoutPassword);
            return userWithoutPassword;
        })
        .then(user => {
            console.log("UserServices local storage user response: " + user.email + " " + user.authorized);
            if (user.authorized) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
        .catch(error => {
            // with axios it seems like if status code is not 200 an exception is thrown
            // alert("Log in Error");
            console.log("User could get in: " + error);
            console.log('reponse status: ', error.response.status)
            // if (error.response.status === 401) {
            logout();
            //     location.reload(true);
            // }
            const error_msg = (error.response.data && error.response.data.message) || error.response.statusText;
            console.log('reject - error: ', error_msg);
            //return Promise.reject(error_msg);
            throw error_msg;
        });
}

// setTimeout is wrapped into a promise
// const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
const wait = function (ms) {
    return new Promise(function (resolve) {
        console.log("Executing the wait promise")
        return setTimeout(resolve, ms);
    })
}

function send_closure(user, actionPath) {
    return function dummy() {
        console.log("sendDummyRequest - " + actionPath + ": ", user)
        user.authorized = true;
        const { password, ...userWithoutPassword } = user
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        console.log("return user: ", userWithoutPassword);
        return userWithoutPassword;
    }
}

function sendDummyRequest(user, actionPath) {
    var dummySend = send_closure(user, actionPath);
    wait(100).then(dummySend)
    .catch(error => {
                    // with axios it seems like if status code is not 200 an exception is thrown
                    // alert("Log in Error");
                    console.log("User could get in: " + error);
                });
}

var postRequest;

if (process.env.VUE_APP_SKIP_AXIOS) {
    console.log("In dev mode skipping axios ... use sendDummyRequest")
    postRequest = sendDummyRequest;
}
else {
    postRequest = sendRequest;
}

export default postRequest;
