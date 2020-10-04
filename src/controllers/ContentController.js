import BaseController from './BaseController.js';
import InfoBlock from '../components/InfoBlock/InfoBlock.js';

class ContentController extends BaseController {
    constructor() {
        super(new InfoBlock());
    }

    switchOn(data = {}) {
        const sessionData = { // запрос на валидность сессии
            authorized: true,
        };

        const contentData = {
            poster: '/static/img/witcherInfo.png',
            title: 'Психопаспорт',
            isAdded: false,
        };

        this.view.insertIntoContext();
    }

    switchOff() {
        this.view.hide();
    }

}

export default ContentController;
