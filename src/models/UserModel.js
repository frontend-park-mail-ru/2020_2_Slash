import Http from '../services/Http.js';
import ApiMethods from '../consts/ApiMethods.js';
import {SERVER_API_V1_PREFIX} from '../consts/settings.js';

class UserModel {
    register(data) {
        return Http.fetchPost({
            route: ApiMethods.UserRegister,
            body: JSON.stringify({...data}),
        }).then((response) => response.json());
    }

    getProfile() {
        return Http.fetchGet({
            route: ApiMethods.UserProfile,
        }).then((response) => response.json());
    }

    logout() {
        return Http.fetchDelete({
            route: ApiMethods.UserLogout,
        }).then((response) => response.json());
    }

    login(data) {
        return Http.fetchPost({
            route: ApiMethods.UserLogin,
            body: JSON.stringify({...data}),
        }).then((response) => response.json());
    }

    updateProfile(data) {
        return Http.fetchPut({
            route: ApiMethods.UserProfile,
            body: JSON.stringify({...data}),
        }).then((response) => response.json());
    }

    uploadAvatar(data) {
        const formData = new FormData();
        formData.append('avatar', data);

        return fetch(`${SERVER_API_V1_PREFIX}${ApiMethods.UserAvatar}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: formData,
        }).then((response) => response.json());
    }
}

export default new UserModel();
