import BaseController from './BaseController.js';
import ProfileView from '../views/ProfileView/ProfileView.js';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/EventBus.js';
import Events from '../consts/events.ts';
import Routes from '../consts/routes.ts';
import {SERVER_HOST} from '../consts/settings.ts';

/**
 * @class
 * Контроллер для страницы профиля
 */
class ProfileController extends BaseController {
    constructor() {
        super(new ProfileView());

        EventBus.on(Events.UpdateProfile, this.onUpdateProfile.bind(this));
        EventBus.on(Events.UploadAvatar, this.onUploadAvatar.bind(this));
    }

    switchOn(data = {}) {
        UserModel.getProfile().then((response) => {
            let sessionData = {
                authorized: false,
            };

            if (!response.error) {
                sessionData.authorized = true;
                const avatar = response.avatar ? `${SERVER_HOST}${response.avatar}` : 'img/default.svg';
                sessionData = Object.assign(sessionData, {
                    avatar: avatar,
                    nickname: response.nickname,
                    email: response.email,
                });

                this.view.insertIntoContext(sessionData);

                this.view.show();

                return;
            }

            EventBus.emit(Events.PathChanged, {path: Routes.MainPage});
        });
    }

    switchOff() {
        this.view.hide();
    }

    /**
     * @function
     * Коллбэк на обновление профиля
     * @param {Object} data - Данные
     */
    // TODO: Протестировать - запросы иногда странно улетают, видимо колбэки копятся
    onUpdateProfile(data) {
        const {nickname, email} = data.params;

        UserModel.updateProfile({
            nickname: nickname,
            email: email,
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

    /**
     * @function
     * Коллбэк на загрузку аватарки
     * @param {Object} data - Данные
     */
    onUploadAvatar(data) {
        const fileUploader = document.getElementById('file-upload');

        fileUploader.addEventListener('change', function() {
            const input = this;

            if (input.files && input.files[0]) {
                UserModel.uploadAvatar(input.files[0]).then((response) => {
                    if (response.error) {
                        alert(response.error);
                        return;
                    }

                    // TODO: Перерисовать конкретные части страницы вместо обновления страницы
                    EventBus.emit(Events.PathChanged, {path: Routes.ProfilePage});
                }).catch((error) => console.log(error));
            }
        });

        fileUploader.click();
    }
}

export default ProfileController;
