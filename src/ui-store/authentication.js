import { userLogin } from "@/services/UserServices";
import router from '@/router'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, user) {
            console.log('Action - login: ' + user.email + " commit func: " + commit)
            commit('loginRequest', { username: user.email });
            console.log('Action - login:  commited');

            userLogin.login(user)
                .then(
                    user => {
                        console.log("Commit login success");
                        commit("setUserAuthorized", true);
                        commit('loginSuccess', user);
                        router.push("drug");
                    },
                    error => {
                        console.log("Commit login error");
                        commit('loginFailure', error);
                        alert('Login failed')
                        // dispatch('alert/error', error, { root: true });
                    }
                );
        },
        signup({ dispatch, commit }, user) {
            console.log('Action - signup: ' + user.email + " commit func: " + commit)
            commit('loginRequest', { username: user.email });
            console.log('Action - signup:  commited');

            userLogin.signup(user)
                .then(
                    user => {
                        console.log("Commit signup success");
                        commit("setUserAuthorized", true);
                        commit('loginSuccess', user);
                        router.push("drug");
                    },
                    error => {
                        console.log("Commit signup error");
                        commit('loginFailure', error);
                        alert('Login failed')
                        // dispatch('alert/error', error, { root: true });
                    }
                );
        },
        logout({ commit }) {
            userService.logout();
            commit('logout');
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            console.log("loginSuccess");
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
}
