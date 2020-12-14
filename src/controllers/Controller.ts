import {SERVER_HOST} from '../consts/settings';
import ResponseType from '../tools/ResponseType';
import UserModel from '../models/UserModel';
import eventBus from '../services/EventBus';
import {Error} from '../consts/errors';
import Events from '../consts/events';
import View from '../views/View';

abstract class Controller {
    view: View;
    private readonly _onCheckSession: any;

    protected constructor(view: View) {
        this.view = view;

        if (!eventBus.getListeners().checkSession) {
            eventBus.on(Events.CheckSession, this.onCheckSession);
        }
    }

    switchOn(data: any = {}) {} // eslint-disable-line

    onSwitchOn(data?: any) {
        eventBus.emit(Events.CheckSession, data);
    } // eslint-disable-line

    switchOff() {
        eventBus.off(Events.CheckSession, this._onCheckSession);
    }

    onCheckSession = () => {
        UserModel.getProfile().then((response: ResponseType) => {
            const sessionData: any = {
                authorized: false,
            };

            localStorage.setItem('authorized', 'false');

            if (!response.error) {
                const {body} = response;
                const avatar = body.user.avatar ? `${SERVER_HOST}${body.user.avatar}` : '/static/img/default.svg';
                sessionData.authorized = true;
                localStorage.setItem('authorized', 'true');
                sessionData.avatar = avatar;
            }

            eventBus.emit(Events.UpdateHeader, sessionData);
        }).catch((error: Error) => console.log());
    }
}

export default Controller;
