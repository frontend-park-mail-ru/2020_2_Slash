import Controller from './Controller';
import PlayerView from '../views/PlayerView/PlayerView';
import PlayerService from '../services/PlayerService';
import MovieModel from '../models/MovieModel';
import TVShowsModel from '../models/TVShowsModel';
import {SERVER_HOST} from '../consts/settings';
import compareByField from '../tools/comparator';

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
        const queryParams = data.query.has('season');
        if (!queryParams) {
            MovieModel.getMovie({id: data.path.resourceId}).then((response) => {
                if (response.error) {
                    return;
                }

                const {movie} = response.body;

                this.view.setContext({});
                this.view.insertIntoContext({
                    title: movie.name,
                    images: `${SERVER_HOST}${movie.images}/1920`,
                    video: `${SERVER_HOST}${movie.video}`,
                });

                this.view.show();

                this.onSwitchOn();
            }).catch((error) => console.log(error));
        } else {
            TVShowsModel.getSeasons(data.path.resourceId).then((response) => {
                if (response.error) {
                    return;
                }

                const indexSeason = data.query.get('season') - 1;
                const indexEpisode = data.query.get('episode') - 1;

                const {tvshow} = response.body;
                tvshow.seasons.sort(compareByField('number'));

                const season = tvshow.seasons[indexSeason];
                const episode = tvshow.seasons[indexSeason].episodes[indexEpisode];

                this.view.insertIntoContext({
                    title: tvshow.name,
                    season: season.number,
                    name: episode.name,
                    episode: episode.number,
                    images: `${SERVER_HOST}${episode.poster}`,
                    video: `${SERVER_HOST}${episode.video}`,
                });

                const episodesInfo = {
                    queue: tvshow,
                    currentEpisode: {
                        indexSeason: indexSeason,
                        indexEpisode: indexEpisode,
                    },
                    nextEpisode: {
                        indexSeason: 0,
                        indexEpisode: 0,
                    },
                    prevEpisode: {
                        indexSeason: 0,
                        indexEpisode: 0,
                    },
                    contentId: data.path.resourceId,
                };

                this.view.show();

                this.onSwitchOn(episodesInfo);
            }).catch((error) => console.log(error));
        }
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
        this.onSwitchOff();
    }

    onSwitchOn(context?: any) {
        this.playerService = new PlayerService(context);
        this.playerService.start();
    }

    onSwitchOff() {
        if (this.playerService) {
            this.playerService.stop();
        }
    }
}

export default PlayerController;
