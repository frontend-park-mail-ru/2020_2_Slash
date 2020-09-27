import BaseController from './BaseController.js';
import UserModel from '../models/UserModel.js';
import MainView from '../views/MainVIew/MainView.js';

class MainController extends BaseController {
    constructor() {
        super(new MainView());
    }

    switchOn(data = null) {
        this.view.show();
        this.onSwitchOn();
    }

    onSwitchOn() {
    }

    switchOff() {
        this.view.hide();
        this.onSwitchOff();
    }

    onSwitchOff() {
    }
}

export default MainController;
