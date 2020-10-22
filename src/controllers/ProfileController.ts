import Controller from './Controller';
import ProfileView from '../views/ProfileView/ProfileView';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/EventBus.js';
import Events from '../consts/events';
import Routes from '../consts/routes';
import {SERVER_HOST} from '../consts/settings';

/**
 * @class
 * Контроллер для страницы профиля
 */
class ProfileController extends Controller {
    constructor() {
        super(new ProfileView());

        EventBus.on(Events.UpdateProfileInfo, this.onUpdateProfile.bind(this))
            .on(Events.UploadAvatar, this.onUploadAvatar.bind(this));
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
        super.switchOff();
        this.view.hide();
        EventBus.off(Events.UpdateProfileInfo, this.onUpdateProfile.bind(this))
            .off(Events.UploadAvatar, this.onUploadAvatar.bind(this));
    }

    /**
     * @function
     * Коллбэк на обновление профиля
     * @param {Object} data - Данные
     */
    onUpdateProfile(data: any = {}) {
        const {nickname, email} = data.params;

        UserModel.updateProfile({
            nickname: nickname,
            email: email,
        }).then((response) => {
            if (!response.error) {
                EventBus.emit(Events.UpdateUserProfile, {
                    nickname: nickname,
                    email: email,
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

                    const data = {
                        avatar: `${SERVER_HOST}/avatars/${response.avatar}`,
                    };

                    EventBus.emit(Events.UpdateProfileAvatar, data);
                }).catch((error) => console.log(error));
            }
        });

        fileUploader.click();
    }
}

export default ProfileController;


