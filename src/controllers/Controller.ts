import UserModel from "../models/UserModel";
import {SERVER_HOST} from "../consts/settings";
import EventBus from "../services/EventBus";
import Events from "../consts/events";
import View from "../views/View";

abstract class Controller {
    view: View;
    private readonly _onUpdateUserInfo: any;

    protected constructor(view: View) {
        this.view = view;

        this._onUpdateUserInfo = this.onUpdateUserInfo.bind(this)
        EventBus.on(Events.UpdateUserInfo, this._onUpdateUserInfo);
    }

    switchOn(data: any = {}) {}

    onSwitchOn(data?: any) {}

    switchOff() {
        EventBus.off(Events.UpdateUserInfo, this._onUpdateUserInfo);
    }

    onUpdateUserInfo() {
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
