import { Commit } from 'vuex';
import { User } from '@/interface/';
import * as types from '../types/';

let defaultUser: User;
if (localStorage.getItem('user')) {
    defaultUser = JSON.parse(JSON.stringify(localStorage.getItem('user')));
} else {
    defaultUser = {
        login_name: ''
    }
    localStorage.setItem('user', JSON.stringify(defaultUser));
}

interface State {
    user: User
}

const state: State = {
    user: defaultUser
}

const getters = {
    getLocalUser: () => state.user.id ? state.user : JSON.parse(<string>localStorage.getItem('user')),
    getUserHeadImg: () => getters.getLocalUser().head_img,
}

const mutations = {
    [types.SAVE_LOGIN_USER](state: State, user: User) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    [types.CLEAR_LOCAL_USER](state: State) {
        let user = {
            login_name: ''
        }
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    }
}

const actions = {
    saveLoginUser(context: { commit: Commit }, user: User) {
        context.commit(types.SAVE_LOGIN_USER, user);
    },
    clearLocalUser(context: { commit: Commit }) {
        context.commit(types.CLEAR_LOCAL_USER);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
