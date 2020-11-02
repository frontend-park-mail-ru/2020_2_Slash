import {http} from '../services/Http';
import ApiMethods from '../consts/ApiMethods';
import {SignUpRequest, UpdateProfileRequest} from './Requests';
import {SERVER_API_V1_PREFIX} from '../consts/settings';

class UserModel {
    constructor() {}

    register(data: SignUpRequest) {
        return http.fetchPost({
            route: ApiMethods.UserRegister,
            body: JSON.stringify({...data}),
        }).then((response: Response) => response.json());
    }

    getProfile() {
        return http.fetchGet({
            route: ApiMethods.UserProfile,
        }).then((response: Response) => response.json());
    }

    updateProfile(data: UpdateProfileRequest) {
        return http.fetchPut({
            route: ApiMethods.UserProfile,
            body: JSON.stringify({...data}),
        }).then((response: Response) => response.json());
    }

    uploadAvatar(data: File) {
        const formData = new FormData();
        formData.append('avatar', data);

        return fetch(`${SERVER_API_V1_PREFIX}${ApiMethods.UserAvatar}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: formData,
        }).then((response: Response) => response.json());
    }
}

export default new UserModel();
