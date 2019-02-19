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
        loginAuth({ dispatch, commit }, form) {
            console.log('Action - login: ' + form.email + " commit func: " + commit)
            commit('loginRequest', { username: form.email });
            console.log('Action - login:  commited');

            userLogin.loginUsr(form)
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
