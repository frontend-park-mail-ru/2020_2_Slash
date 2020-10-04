import BaseController from './BaseController.js';
import ProfileView from '../views/ProfileView/ProfileView.js';

class ProfileController extends BaseController {
    constructor() {
        super(new ProfileView());
    }

    switchOn(data = {}) {
        const sessionData = { // запрос на валидность сессии
            authorized: true,
            avatar: '/static/img/avatar.svg',
            nickname: 'yletamitlu',
            email: 'yletamitlu@slash.com',
        };

        this.view.insertIntoContext(sessionData);

        this.view.show();
    }

    switchOff() {
        this.view.hide();
    }
}

export default ProfileController;
