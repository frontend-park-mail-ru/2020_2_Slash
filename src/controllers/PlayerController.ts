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
        if (!data.query) {
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

                const indexSeason = data.query.get('season') - 1;
                const indexEpisode = data.query.get('episode') - 1;

                const {tvshow} = response.body;

                this.view.insertIntoContext({
                    title: tvshow.name,
                    name: tvshow.seasons[indexSeason].episodes[indexEpisode].name,
                    season: tvshow.seasons[indexSeason].number,
                    episode: tvshow.seasons[indexSeason].episodes[indexEpisode].number,
                    images: tvshow.seasons[indexSeason].episodes[indexEpisode].images,
                    video: tvshow.seasons[indexSeason].episodes[indexEpisode].video,
                    seasons: tvshow.seasons,
                    type: null,
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
