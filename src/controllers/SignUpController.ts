import Controller, {ResponseUserType} from './Controller';
import Events from '../consts/events';
import Routes from '../consts/routes';
import Modals from '../consts/modals';
import Statuses from '../consts/statuses';
import MainView from '../views/MainVIew/MainView';
import SessionModel from '../models/SessionModel';
import UserModel from '../models/UserModel';
import eventBus from '../services/EventBus';

/**
 * @class
 * Контроллер для страницы регистрации
 */
class SignupController extends Controller {

    constructor() {
        super(new MainView());

        eventBus.on(Events.SignupUser, this.onSignupUser.bind(this));
    }

    switchOn(data: any = {}) {
        SessionModel.check().then((response: ResponseUserType) => {
            const callbackData: any = {
                path: Routes.MainPage,
            };

            if (response.status === Statuses.UNAUTHORIZED) {
                callbackData.misc = {
                    modalStatus: Modals.signup,
                };
            }

            eventBus.emit(Events.PathChanged, callbackData);
        }).catch((error: Error) => console.log(error));
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
    }

    onSignupUser(data: any = {}) {
        const {nickname, email, password, repeatedPassword} = data.params;

        UserModel.register({
            nickname: nickname,
            email: email,
            password: password,
            repeated_password: repeatedPassword,
        }).then((response: ResponseUserType) => {
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

export default SignupController;
