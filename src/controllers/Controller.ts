import UserModel from '../models/UserModel';
import {SERVER_HOST} from '../consts/settings';
import EventBus from '../services/EventBus';
import Events from '../consts/events';
import View from '../views/View';

abstract class Controller {
    view: View;

    protected constructor(view: View) {
        this.view = view;

        if (!EventBus.listeners.updateUserInfo) {
            EventBus.on(Events.UpdateUserInfo, this.onUpdateUserInfo);
        }
    }

    switchOn(data: any = {}) {}

    onSwitchOn(data?: any) {}

    switchOff() {
        EventBus.off(Events.UpdateUserInfo, this.onUpdateUserInfo);
    }

    onUpdateUserInfo = () => {
        UserModel.getProfile().then((response) => {
            const sessionData: any = {
                authorized: false,
            };

            if (!response.error) {
                const avatar = response.avatar ? `${SERVER_HOST}${response.avatar}` : '/static/img/default.svg';
                sessionData.authorized = true;
                sessionData.avatar = avatar;
            }

            EventBus.emit(Events.UpdateHeader, sessionData);
        }).catch((error) => console.log(error));
    }
}

export default Controller;
