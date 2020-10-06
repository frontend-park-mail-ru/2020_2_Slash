import Http from "../services/Http.js";

class SessionModel {
    check() {
        return Http.fetchGet({
            route: '/session',
        }).then(response => response.json());
    }
}

export default new SessionModel();
