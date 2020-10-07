import Http from "../services/Http.js";

class UserModel {
    register(data) {
        return Http.fetchPost({
            route: '/user/register',
            body: JSON.stringify({...data})
        }).then(response => response.json());
    }

    profile() {
        return Http.fetchGet({
            route: '/user/profile',
        }).then(response => response.json());
    }

    logout() {
        return Http.fetchDelete({
            route: '/user/logout',
        }).then(response => response.json());
    }

    login(data) {
        return Http.fetchPost({
            route: '/user/login',
            body: JSON.stringify({...data})
        }).then(response => response.json());
    }
}

export default new UserModel();
