import Http from '../services/Http.js';
import ApiMethods from '../consts/ApiMethods';

class SessionModel {
    check() {
        return Http.fetchGet({
            route: ApiMethods.CheckSession,
        }).then((response) => response.json());
    }
}

export default new SessionModel();