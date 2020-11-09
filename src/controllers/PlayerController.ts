import Controller from './Controller';
import PlayerView from '../views/PlayerView/PlayerView';
import PlayerService from '../services/PlayerService';

/**
 * @class
 * Контроллер для страницы профиля
 */
class PlayerController extends Controller {
    view: PlayerView;

    private playerService: PlayerService;

    constructor() {
        super(new PlayerView());
        this.playerService = null;
    }

    switchOn() {
        this.view.insertIntoContext( {
            title: 'Witcher',
            poster: '/static/img/witcher2.webp',
            video: '/static/img/witcher.mp4',
        });
        this.view.show();

        this.onSwitchOn();
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
        this.onSwitchOff();
    }

    onSwitchOn() {
        this.playerService = new PlayerService();
        this.playerService.start();
    }

    onSwitchOff() {
        this.playerService.stop();
    }
}

export default PlayerController;
