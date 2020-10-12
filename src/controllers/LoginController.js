import BaseController from './BaseController.js';
import MainView from '../views/MainVIew/MainView.js';
import EventBus from '../services/EventBus.js';
import Routes from '../consts/routes.ts';
import Modals from '../consts/modals.ts';
import Events from '../consts/events.ts';
import UserModel from '../models/UserModel.js';
import SessionModel from '../models/SessionModel.js';
import Statuses from '../consts/statuses.ts';

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

            if (response.status === Statuses.UNAUTHORIZED) {
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
            if (response.result === Statuses.OK) {
                EventBus.emit(Events.PathChanged, {path: Routes.MainPage});
            }
        }).catch((error) => console.log(error));
    }

    onLoginUser(data) {
        const {email, password} = data.params;

        UserModel.login({
            email: email,
            password: password,
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
