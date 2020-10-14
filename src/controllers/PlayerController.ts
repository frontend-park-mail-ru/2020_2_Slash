import TBaseController from './TBaseController';
import PlayerView from '../views/PlayerView/PlayerView';
import PlayerService from '../services/PlayerService'

/**
 * @class
 * Контроллер для страницы профиля
 */
class PlayerController extends TBaseController {
    private playerService: PlayerService;

    constructor() {
        super(new PlayerView());
        this.playerService = null;
    }

    switchOn(data: any = {}) {
        this.view.insertIntoContext( {
            title: 'Witcher',
            poster: '/static/img/witcher2.jpg',
            video: '/static/img/witcher.mp4'
        });
        this.view.show();

        this.onSwitchOn();
    }

    switchOff() {
        this.view.hide();
        this.onSwitchOff();
    }

    onSwitchOn(data?: any) {
        this.playerService = new PlayerService();
        this.playerService.start();
    }

    onSwitchOff() {
        this.playerService.stop();
    }
}

export default PlayerController;
