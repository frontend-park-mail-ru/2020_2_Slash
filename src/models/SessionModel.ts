import ApiMethods from '../consts/ApiMethods';
import {http} from '../services/Http';
import {LoginRequest} from './Requests';

class SessionModel {
    logout() {
        return http.fetchDelete({
            route: ApiMethods.UserLogout,
            body: 'kek',
        }).then((response: Response) => {
            return response.json();
        });
    }

    login(data: LoginRequest) {
        return http.fetchPost({
            route: ApiMethods.UserLogin,
            body: JSON.stringify({...data}),
        }).then((response: Response) => {
            localStorage.setItem('X-Csrf-Token', response.headers.get('X-Csrf-Token'));
            console.log(localStorage.getItem('X-Csrf-Token'));
            return response.json();
        });
    }
}

export default new SessionModel();
