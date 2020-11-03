import SessionModel from '../models/SessionModel';
import ResponseType from '../tools/ResponseType';
import Controller from './Controller';
import UserModel from '../models/UserModel';
import MainView from '../views/MainVIew/MainView';
import eventBus from '../services/EventBus';
import Routes from '../consts/routes';
import Modals from '../consts/modals';
import Events from '../consts/events';

/**
 * @class
 * Контроллер для страницы авторизации
 */

class LoginController extends Controller {
    constructor() {
        super(new MainView());

        eventBus.on(Events.LoginUser, this.onLoginUser.bind(this));
        eventBus.on(Events.LogoutUser, this.onLogout.bind(this));
    }

    switchOn() {
        UserModel.getProfile().then((response: ResponseType) => {
            const callbackData: any = {
                path: Routes.MainPage,
            };

            if (response.error) {
                callbackData.misc = {
                    modalStatus: Modals.signin,
                };
            }

            eventBus.emit(Events.PathChanged, callbackData);
        }).catch((error: Error) => console.log(error));
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
    }

    onLogout() {
        SessionModel.logout().then((response: ResponseType) => {
            if (!response.error) {
                eventBus.emit(Events.PathChanged, {path: Routes.MainPage});
                eventBus.emit(Events.UpdateHeader, {authorized: false});
            }
        }).catch((error: Error) => console.log(error));
    }

    onLoginUser(data: any = {}) {
        const {email, password} = data.params;

        SessionModel.login({
            email: email,
            password: password,
        }).then((response: ResponseType) => {
            if (!response.error) {
                eventBus.emit(Events.PathChanged, {
                    path: Routes.MainPage,
                });

                data.popup.remove();
                return;
            }

            data.popup.onError(response.error, data.formType);
        }).catch((error: Error) => console.log(error));
    }
}

export default LoginController;
