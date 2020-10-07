import BaseController from './BaseController.js';
import MainView from '../views/MainVIew/MainView.js';
import EventBus from '../services/EventBus.js';
import Routes from '../consts/routes.js';
import Modals from '../consts/modals.js';
import Events from '../consts/events.js';
import UserModel from '../models/UserModel.js';
import SessionModel from '../models/SessionModel.js';

/**
 * @class
 * Контроллер для страницы авторизации
 */
class LoginController extends BaseController {
    constructor() {
        super(new MainView());

        EventBus.on(Events.LoginUser, this.onLoginUser.bind(this));
        EventBus.on(Events.LogoutUser, this.onLogout.bind(this));
    }

    switchOn(data = {}) {
        SessionModel.check().then((response) => {
            const callbackData = {
                path: Routes.MainPage,
            };

            if (response.status === 'unauthorized') {
                callbackData.misc = {
                    modalStatus: Modals.signin,
                };
            }

            EventBus.emit(Events.PathChanged, callbackData);
        }).catch((error) => console.log(error));
    }

    switchOff() {
        this.view.hide();
    }

    onLogout(data) {
        UserModel.logout().then((response) => {
            if (response.result === 'ok') {
                EventBus.emit(Events.PathChanged, {path: Routes.MainPage});
            }
        }).catch((error) => console.log(error));
    }

    onLoginUser(data) {
        UserModel.login({
            email: data.params.email,
            password: data.params.password,
        }).then((response) => {
            if (!response.error) {
                EventBus.emit(Events.PathChanged, {
                    path: Routes.MainPage,
                });

                data.popup.remove();
                return;
            }

            data.popup.onError(response.error, data.formType);
        }).catch((error) => console.log(error));
    }
}

export default LoginController;
