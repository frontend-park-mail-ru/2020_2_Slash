import BaseController from './BaseController.js';
import EventBus from '../services/EventBus.js';
import Events from '../consts/events.js';
import Routes from '../consts/routes.js';
import Modals from '../consts/modals.js';
import MainView from '../views/MainVIew/MainView.js';
import SessionModel from '../models/SessionModel.js'
import UserModel from "../models/UserModel.js";

class SignupController extends BaseController {
    constructor() {
        super(new MainView());

        EventBus.on(Events.SignupUser, this.onSignupUser.bind(this));
    }

    switchOn(data = {}) {
        SessionModel.check().then(response => {
            const callbackData = {
                path: Routes.MainPage,
            };

            if (response.status === 'unauthorized') {
                callbackData.misc = {
                    modalStatus: Modals.signup,
                };
            }

            EventBus.emit(Events.PathChanged, callbackData);
        });
    }

    switchOff() {
        this.view.hide();
    }

    onSignupUser(data) {
        console.log(data);
        UserModel.register({
            nickname: data.login,
            email: data.email,
            password: data.password,
            repeated_password: data.repeatPassword,
        }).then(response => {
            if (!response.error) {
                EventBus.emit(Events.PathChanged, {
                    path: Routes.MainPage
                });
            }
        }).catch(error => console.log(error));
    }
}

export default SignupController;
