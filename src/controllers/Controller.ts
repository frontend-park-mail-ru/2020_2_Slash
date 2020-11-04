import {SERVER_HOST} from '../consts/settings';
import ResponseType from '../tools/ResponseType';
import UserModel from '../models/UserModel';
import eventBus from '../services/EventBus';
import {Error} from '../consts/errors';
import Events from '../consts/events';
import View from '../views/View';

abstract class Controller {
    view: View;
    private readonly _onUpdateUserInfo: any;

    protected constructor(view: View) {
        this.view = view;

        if (!eventBus.getListeners().updateUserInfo) {
            eventBus.on(Events.UpdateUserInfo, this.onUpdateUserInfo);
        }
    }

    switchOn(data: any = {}) {}

    onSwitchOn(data?: any) {}

    switchOff() {
        eventBus.off(Events.UpdateUserInfo, this._onUpdateUserInfo);
    }

    onUpdateUserInfo = () => {
        UserModel.getProfile().then((response: ResponseType) => {
            const sessionData: any = {
                authorized: false,
            };

            if (!response.error) {
                const {body} = response;
                const avatar = body.avatar ? `${SERVER_HOST}${body.avatar}` : '/static/img/default.svg';
                sessionData.authorized = true;
                sessionData.avatar = avatar;
            }

            eventBus.emit(Events.UpdateHeader, sessionData);
        }).catch((error: Error) => console.log(error));
    }
}

export default Controller;
