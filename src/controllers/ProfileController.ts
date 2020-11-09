import {SERVER_HOST} from '../consts/settings';
import ResponseType from '../tools/ResponseType';
import ProfileView from '../views/ProfileView/ProfileView';
import Controller from './Controller';
import UserModel from '../models/UserModel';
import eventBus from '../services/EventBus';
import Events from '../consts/events';
import Routes from '../consts/routes';

/**
 * @class
 * Контроллер для страницы профиля
 */
class ProfileController extends Controller {
    view: ProfileView;

    constructor() {
        super(new ProfileView());

        eventBus.on(Events.UpdateProfileInfo, this.onUpdateProfile.bind(this));
        eventBus.on(Events.UploadAvatar, this.onUploadAvatar.bind(this));
    }

    switchOn() {
        UserModel.getProfile().then((response: ResponseType) => {
            let sessionData: any = {
                authorized: false,
            };

            if (!response.error) {
                sessionData.authorized = true;
                const user = response.body.user;
                const avatar = user.avatar ? `${SERVER_HOST}${user.avatar}` : '/static/img/default.svg';
                const {nickname, email} = user;
                sessionData = {...sessionData, avatar, nickname, email};

                this.view.insertIntoContext(sessionData);
                this.view.show();
                this.onSwitchOn();
                return;
            }

            eventBus.emit(Events.PathChanged, {path: Routes.MainPage});
        });
    }

    onSwitchOn(data?: any) {
        super.onSwitchOn(data);
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
        eventBus.off(Events.UpdateProfileInfo, this.onUpdateProfile.bind(this))
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
        }).then((response: ResponseType) => {
            if (!response.error) {
                eventBus.emit(Events.UpdateUserProfile, {
                    nickname: nickname,
                    email: email,
                });
                return;
            }

            data.form.onError(response.error, data.formType);
        }).catch((error: Error) => console.log(error));
    }

    /**
     * @function
     * Коллбэк на загрузку аватарки
     * @param {Object} data - Данные
     */
    onUploadAvatar() {
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
                        avatar: `${SERVER_HOST}/avatars/${response.body.avatar}`,
                    };
                    eventBus.emit(Events.UpdateProfileAvatar, data);
                }).catch((error: Error) => console.log(error));
            }
        });

        fileUploader.click();
    }
}

export default ProfileController;
