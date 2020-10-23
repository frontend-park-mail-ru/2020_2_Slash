import Controller, {ResponseUserType} from './Controller';
import MainView from '../views/MainVIew/MainView';
import Routes from '../consts/routes';
import Modals from '../consts/modals';
import Events from '../consts/events';
import Statuses from '../consts/statuses';
import UserModel from '../models/UserModel';
import SessionModel from '../models/SessionModel';
import EventBus from '../services/EventBus';

/**
 * @class
 * Контроллер для страницы авторизации
 */
class LoginController extends Controller {
    constructor() {
        super(new MainView());

        const eventBus = EventBus.getInstance();
        eventBus.on(Events.LoginUser, this.onLoginUser.bind(this));
        eventBus.on(Events.LogoutUser, this.onLogout.bind(this));
    }

    switchOn(data: any = {}) {
        SessionModel.check().then((response: ResponseUserType) => {
            const callbackData: any = {
                path: Routes.MainPage,
            };

            if (response.status === Statuses.UNAUTHORIZED) {
                callbackData.misc = {
                    modalStatus: Modals.signin,
                };
            }
            const eventBus = EventBus.getInstance();
            eventBus.emit(Events.PathChanged, callbackData);
        }).catch((error: Error) => console.log(error));
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
    }

    onLogout(data: any = {}) {
        UserModel.logout().then((response: ResponseUserType) => {
            if (response.result === Statuses.OK) {
                const eventBus = EventBus.getInstance();
                eventBus.emit(Events.PathChanged, {path: Routes.MainPage});
                eventBus.emit(Events.UpdateHeader, {authorized: false});
            }
        }).catch((error: Error) => console.log(error));
    }

    onLoginUser(data: any = {}) {
        const {email, password} = data.params;

        UserModel.login({
            email: email,
            password: password,
        }).then((response: ResponseUserType) => {
            if (!response.error) {
                const eventBus = EventBus.getInstance();
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
