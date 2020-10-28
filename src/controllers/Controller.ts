import UserModel from '../models/UserModel';
import {SERVER_HOST} from '../consts/settings';
import EventBus from '../services/EventBus';
import Events from '../consts/events';
import View from '../views/View';

export interface ResponseUserType {
    id: number,
    nickname: string,
    avatar: string,
    email: string,
    status: string,
    result: string,
    error: boolean,
}

abstract class Controller {
    view: View;
    private readonly _onUpdateUserInfo: any;

    protected constructor(view: View) {
        this.view = view;

        const eventBus = EventBus.getInstance();
        if (!eventBus.getListeners().updateUserInfo) {
            eventBus.on(Events.UpdateUserInfo, this.onUpdateUserInfo);
        }
    }

    switchOn(data: any = {}) {}

    onSwitchOn(data?: any) {}

    switchOff() {
        const eventBus = EventBus.getInstance();
        eventBus.off(Events.UpdateUserInfo, this._onUpdateUserInfo);
    }

    onUpdateUserInfo = () => {
        UserModel.getProfile().then((response: ResponseUserType) => {
            const sessionData: any = {
                authorized: false,
            };

            if (!response.error) {
                const avatar = response.avatar ? `${SERVER_HOST}${response.avatar}` : '/static/img/default.svg';
                sessionData.authorized = true;
                sessionData.avatar = avatar;
            }

            const eventBus = EventBus.getInstance();
            eventBus.emit(Events.UpdateHeader, sessionData);
        }).catch((error: Error) => console.log(error));
    }
}

export default Controller;
