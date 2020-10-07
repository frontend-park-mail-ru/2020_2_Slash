import BaseController from './BaseController.js';
import ProfileView from '../views/ProfileView/ProfileView.js';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/EventBus.js';
import Events from '../consts/events.js';
import Routes from '../consts/routes.js';

class ProfileController extends BaseController {
    constructor() {
        super(new ProfileView());

        EventBus.on(Events.UpdateProfile, this.onUpdateProfile.bind(this));
    }

    switchOn(data = {}) {
        UserModel.getProfile().then((response) => {
            let sessionData = {
                authorized: false,
            };

            if (!response.error) {
                sessionData.authorized = true;
                sessionData = Object.assign(sessionData, {
                    avatar: response.avatar || '/static/img/default.svg',
                    nickname: response.nickname,
                    email: response.email,
                });
            }

            this.view.insertIntoContext(sessionData);

            this.view.show();
        });
    }

    switchOff() {
        this.view.hide();
    }

    // TODO: Протестировать - запросы иногда странно улетают, видимо колбэки копятся
    onUpdateProfile(data) {
        UserModel.updateProfile({
            nickname: data.params.name,
            email: data.params.email,
        }).then((response) => {
            if (!response.error) {
                EventBus.emit(Events.PathChanged, {
                    path: Routes.ProfilePage,
                });

                return;
            }

            data.form.onError(response.error, data.formType);
        }).catch((error) => console.log(error));
    }
}

export default ProfileController;
