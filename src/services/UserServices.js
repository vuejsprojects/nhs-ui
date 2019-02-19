import axios from "axios";

function loginUsr(form) {
    // evt.preventDefault();
    console.log('UserService - login: ' + form)
    alert(JSON.stringify(form));
    const path = "/api/login";
    const headers = {
        "Content-Type": "application/json"
        // Authorization: "JWT fefege..."
    };
    return axios
        .post(path, form, { headers: headers })
        .then(response => {
            console.log("Got login response: " + response.data.authorized);
            const authorized = response.data.authorized;
            // $store.commit("setUserAuthorized", authorized);
            // if (authorized) {
            //     this.$router.push("drug");
            // }
            form.authorized = authorized;
            console.log("Form response: " + form.email +" " + form.authorized);
            return form;
        })
        .then(form => {
            console.log("UserServices local storage Form response: " + form.email +" " + form.authorized);
            if (form.authorized) {
                localStorage.setItem('user', JSON.stringify(form));
            }
            return {email: form, authorized: form.authorized};
        })
        .catch(error => {
            alert("Log in Error");
            console.log("Something wrong: " + error);
        });
}

export const userLogin = {
    loginUsr
}