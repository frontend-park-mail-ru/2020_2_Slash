import BaseController from './BaseController.js';
import MainView from '../views/MainVIew/MainView.js';
import EventBus from '../services/EventBus.js';
import Routes from '../consts/routes.js';
import Modals from '../consts/modals.js';
import Events from '../consts/events.js';

class LoginController extends BaseController {
    constructor() {
        super(new MainView());
    }

    switchOn(data = {}) {
        const sessionData = {
            authorized: false,
        };

        const callbackData = {
            path: Routes.MainPage,
        };

        if (!sessionData.authorized) {
            callbackData.misc = {
                modalStatus: Modals.signin,
            };
        }

        EventBus.emit(Events.PathChanged, callbackData);
    }

    switchOff() {
        this.view.hide();
    }
}

export default LoginController;
