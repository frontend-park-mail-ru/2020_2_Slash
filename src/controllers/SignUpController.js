import BaseController from './BaseController.js';
import EventBus from '../services/EventBus.js';
import Events from '../consts/events.js';
import Routes from '../consts/routes.js';
import Modals from '../consts/modals.js';
import MainView from '../views/MainVIew/MainView.js';
import SessionModel from '../models/SessionModel.js';
import UserModel from '../models/UserModel.js';

/**
 * @class
 * Контроллер для страницы регистрации
 */
class SignupController extends BaseController {
    constructor() {
        super(new MainView());

        EventBus.on(Events.SignupUser, this.onSignupUser.bind(this));
    }

    switchOn(data = {}) {
        SessionModel.check().then((response) => {
            const callbackData = {
                path: Routes.MainPage,
            };

            if (response.status === 'unauthorized') {
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

    onSignupUser(data) {
        UserModel.register({
            nickname: data.params.login,
            email: data.params.email,
            password: data.params.password,
            repeated_password: data.params.repeatPassword,
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
