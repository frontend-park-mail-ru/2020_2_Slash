import BaseController from './BaseController.js';
import EventBus from '../services/EventBus.js';
import Events from '../consts/events.js';
import Routes from '../consts/routes.js';
import Modals from '../consts/modals.js';
import MainView from '../views/MainVIew/MainView.js';

class SignupController extends BaseController {
    constructor() {
        super(new MainView());
    }

    switchOn(data = {}) {
        const sessionData = {
            authorized: false,
        };

        const callbackData = {
            path: Routes.MainPage,
        }

        if (!sessionData.authorized) {
            callbackData.misc = {
                modalStatus: Modals.signup,
            }
        }

        EventBus.emit(Events.PathChanged, callbackData);
    }

    switchOff() {
        this.view.hide();
    }
}

export default SignupController;
