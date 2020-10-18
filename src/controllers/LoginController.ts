import TBaseController from './TBaseController';
import MainView from '../views/MainVIew/MainView';
import EventBus from '../services/EventBus.js';
import Routes from '../consts/routes';
import Modals from '../consts/modals';
import Events from '../consts/events';
import Statuses from '../consts/statuses';
import UserModel from '../models/UserModel.js';
import SessionModel from '../models/SessionModel.js';

/**
 * @class
 * Контроллер для страницы авторизации
 */
class LoginController extends TBaseController {
    constructor() {
        super(new MainView());

        EventBus.on(Events.LoginUser, this.onLoginUser.bind(this));
        EventBus.on(Events.LogoutUser, this.onLogout.bind(this));
    }

    switchOn(data: any = {}) {
        SessionModel.check().then((response) => {
            const callbackData: any = {
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

    onLogout(data: any = {}) {
        UserModel.logout().then((response) => {
            if (response.result === Statuses.OK) {
                EventBus.emit(Events.PathChanged, {path: Routes.MainPage});
            }
        }).catch((error) => console.log(error));
    }

    onLoginUser(data: any = {}) {
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
