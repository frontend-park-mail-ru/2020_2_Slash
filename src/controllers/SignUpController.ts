import TBaseController from './TBaseController';
import EventBus from '../services/EventBus.js';
import Events from '../consts/events';
import Routes from '../consts/routes';
import Modals from '../consts/modals';
import Statuses from '../consts/statuses';
import MainView from '../views/MainVIew/MainView.js';
import SessionModel from '../models/SessionModel.js';
import UserModel from '../models/UserModel.js';

/**
 * @class
 * Контроллер для страницы регистрации
 */
class SignupController extends TBaseController {
    constructor() {
        super(new MainView());

        EventBus.on(Events.SignupUser, this.onSignupUser.bind(this));
    }

    switchOn(data: any = {}) {
        SessionModel.check().then((response) => {
            const callbackData: any = {
                path: Routes.MainPage,
            };

            if (response.status === Statuses.UNAUTHORIZED) {
                callbackData.misc = {
                    modalStatus: Modals.signup,
                };
            }

            EventBus.emit(Events.PathChanged, callbackData);
        }).catch((error) => console.log(error));
    }

    switchOff() {
        this.view.hide();
    }

    onSignupUser(data: any = {}) {
        const {nickname, email, password, repeated_password} = data.params;

        UserModel.register({
            nickname: nickname,
            email: email,
            password: password,
            repeated_password: repeated_password,
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

export default SignupController;
