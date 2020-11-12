import ResponseType from '../tools/ResponseType';
import Controller from './Controller';
import UserModel from '../models/UserModel';
import eventBus from '../services/EventBus';
import MainView from '../views/MainVIew/MainView';
import Events from '../consts/events';
import Routes from '../consts/routes';
import Modals from '../consts/modals';

/**
 * @class
 * Контроллер для страницы регистрации
 */
class SignupController extends Controller {
    constructor() {
        super(new MainView());

        eventBus.on(Events.SignupUser, this.onSignupUser.bind(this));
    }

    switchOn() {
        UserModel.getProfile().then((response: ResponseType) => {
            const callbackData: any = {
                path: Routes.MainPage,
            };

            if (response.error) {
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

export default SignupController;
