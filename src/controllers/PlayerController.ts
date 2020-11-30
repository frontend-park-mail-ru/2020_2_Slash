import Controller from './Controller';
import PlayerView from '../views/PlayerView/PlayerView';
import PlayerService from '../services/PlayerService';
import MovieModel from '../models/MovieModel';
import TVShowsModel from '../models/TVShowsModel';

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
        if (data.movieId) {
            MovieModel.getMovie({id: data.path.resourceId}).then((response) => {
                if (response.error) {
                    return;
                }

                const {movie} = response.body;

                this.view.insertIntoContext({
                    title: movie.name,
                    images: movie.images,
                    video: movie.video,
                    type: movie.type,
                });

                this.view.show();

                this.onSwitchOn();
            }).catch((error) => console.log(error));
        } else {
            TVShowsModel.getTVShowsInfo({id: data.path.resourceId}).then((response) => {
                if (response.error) {
                    return;
                }

                const {tvshow} = response.body;

                this.view.insertIntoContext({
                    title: tvshow.name,
                    name: tvshow.seasons[0].episodes[0].name,
                    season: tvshow.seasons[0].number,
                    episode: tvshow.seasons[0].episodes[0].number,
                    images: tvshow.seasons[0].episodes[0].images,
                    video: tvshow.seasons[0].episodes[0].video,
                    seasons: tvshow.seasons,
                });

                this.view.show();

                this.onSwitchOn();
            }).catch((error) => console.log(error));
        }
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
