import ApiMethods from '../consts/ApiMethods';
import {http} from '../services/Http';
import {LoginRequest} from './Requests';

class SessionModel {
    logout() {
        return http.fetchDelete({
            route: ApiMethods.UserLogout,
        }).then((response: Response) => response.json());
    }

    login(data: LoginRequest) {
        return http.fetchPost({
            route: ApiMethods.UserLogin,
            body: JSON.stringify({...data}),
        }).then((response: Response) => response.json());
    }
}

export default new SessionModel();
