import TBaseController from './TBaseController';
import ProfileView from '../views/ProfileView/ProfileView.js';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/EventBus.js';
import Events from '../consts/events';
import Routes from '../consts/routes';
import {SERVER_HOST} from '../consts/settings';

/**
 * @class
 * Контроллер для страницы профиля
 */
class ProfileController extends TBaseController {
    constructor() {
        super(new ProfileView());

        EventBus.on(Events.UpdateProfile, this.onUpdateProfile.bind(this));
        EventBus.on(Events.UploadAvatar, this.onUploadAvatar.bind(this));
    }

    switchOn(data: any = {}) {
        UserModel.getProfile().then((response) => {
            let sessionData: any = {
                authorized: false,
            };

            if (!response.error) {
                sessionData.authorized = true;
                const avatar = response.avatar ? `${SERVER_HOST}${response.avatar}` : '/static/img/default.svg';
                const {nickname, email} = response;
                sessionData = {...sessionData, avatar, nickname, email};

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
    onUpdateProfile(data: any = {}) {
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
    onUploadAvatar(data: any = {}) {
        const fileUploader = document.getElementById('file-upload');

        fileUploader.addEventListener('change', function() {
            const input: any = this;

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
