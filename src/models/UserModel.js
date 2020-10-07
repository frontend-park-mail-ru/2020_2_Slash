import Http from '../services/Http.js';
import {SERVER_API_V1_PREFIX} from '../consts/settings.js';

class UserModel {
    register(data) {
        return Http.fetchPost({
            route: '/user/register',
            body: JSON.stringify({...data}),
        }).then((response) => response.json());
    }

    getProfile() {
        return Http.fetchGet({
            route: '/user/profile',
        }).then((response) => response.json());
    }

    logout() {
        return Http.fetchDelete({
            route: '/user/logout',
        }).then((response) => response.json());
    }

    login(data) {
        return Http.fetchPost({
            route: '/user/login',
            body: JSON.stringify({...data}),
        }).then((response) => response.json());
    }

    updateProfile(data) {
        return Http.fetchPut({
            route: '/user/profile',
            body: JSON.stringify({...data}),
        }).then((response) => response.json());
    }

    uploadAvatar(data) {
        const formData = new FormData();
        formData.append('avatar', data);

        return fetch(`${SERVER_API_V1_PREFIX}/user/avatar`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: formData,
        }).then((response) => response.json());
    }
}

export default new UserModel();
