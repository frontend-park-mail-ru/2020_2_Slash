import ApiMethods from '../consts/ApiMethods';
import {http} from '../services/Http';

class SessionModel {

    check() {
        return http.fetchGet({
            route: ApiMethods.CheckSession,
        }).then((response: Response) => response.json());
    }
}

export default new SessionModel();
