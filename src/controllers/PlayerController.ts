import TBaseController from './TBaseController';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/EventBus.js';
import Events from '../consts/events.js';
import Routes from '../consts/routes.js';
import {SERVER_HOST} from '../consts/settings.js';
import PlayerView from '../views/PlayerView/PlayerView';
import CustomObject from '../customInterfaces/customObject'

/**
 * @class
 * Контроллер для страницы профиля
 */
class PlayerController extends TBaseController {
    constructor() {
        super(new PlayerView());
    }

    switchOn(data: CustomObject) {
        const data1: CustomObject = {
            poster: '/static/img/witcher2.jpg',
            video: '/static/img/witcher.mp4'
        }
        this.view.insertIntoContext(data1);
        this.view.show();
    }

    switchOff() {
        this.view.hide();
    }
}

export default PlayerController;
