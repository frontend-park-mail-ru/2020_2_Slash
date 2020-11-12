import Controller from './Controller';
import PlayerView from '../views/PlayerView/PlayerView';
import PlayerService from '../services/PlayerService';
import MovieModel from '../models/MovieModel';

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

    switchOn(data: any) {
	MovieModel.getMovie({id: data.path.resourceId}).then((response) => {
	    if (response.error) {
	    	return;
	    }

	    const {movie} = response.body;

	    this.view.insertIntoContext({
		title: movie.name,
		images: movie.images,
		video: movie.video,
	    });

	    this.view.show();

	    this.onSwitchOn();
	}).catch((error) => console.log(error));
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
