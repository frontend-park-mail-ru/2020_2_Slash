import Controller from './Controller';
import MoviesView from '../views/MoviesView/MoviesView';
import ModalService from '../services/ModalService';
import Events from '../consts/events';
import eventBus from '../services/EventBus';
import SubMenuPopup from '../components/SubMenuPopup/SubMenuPopup';
import {Genres} from '../consts/genres';
import MovieModel from '../models/MovieModel';
import {Error} from '../consts/errors';
import selectRandomMovie from '../tools/selectRandom';
import Context from '../tools/Context';
import {GetGenreNameById} from '../tools/helper';

interface ContextData {
    preview: { [key: string]: string },
    singleGenre: boolean,
    blocks: { [key: string]: string }[],
    genre: string;
}

/**
 * @class
 * Контроллер для главной страницы
 */
class MoviesController extends Controller {
    view: MoviesView;

    constructor() {
        super(new MoviesView());
    }

    switchOn(data: any = {}) {
        eventBus.on(Events.OpenSubMenuGenres, this.onOpenSubMenuGenres);

        if (data.query && data.query.has('genre')) {
            this.showGenrePage(data.query.get('genre'));
            return;
        }

        Promise.all([
            MovieModel.getMoviesByGenre(Genres.actions.id, 15),
            MovieModel.getMoviesByGenre(Genres.comedies.id, 15),
            MovieModel.getMoviesByGenre(Genres.dramas.id, 15),
            MovieModel.getMoviesByGenre(Genres.melodramas.id, 15),
            MovieModel.getMoviesByGenre(Genres.adventures.id, 15),
            MovieModel.getMoviesByGenre(Genres.animation.id, 15),
            MovieModel.getMoviesByGenre(Genres.criminal.id, 15),
            MovieModel.getMoviesByGenre(Genres.detective.id, 15),
            MovieModel.getMoviesByGenre(Genres.fantastic.id, 15),
            MovieModel.getMoviesByGenre(Genres.fantasy.id, 15),
            MovieModel.getMoviesByGenre(Genres.horrors.id, 15),
            MovieModel.getMoviesByGenre(Genres.military.id, 15),
            MovieModel.getMoviesByGenre(Genres.thrillers.id, 15),
            MovieModel.getMoviesByGenre(Genres.western.id, 15),
        ]).then(([actionResponse, comediesResponse, dramasResponse, melodramasResponse,
            advResponse, animResponse, crimeResponse, detectResponse, fantasticResponse,
            fanResponse, horrResponse, militResponse, thrillResponse, westResponse]) => {
            if (actionResponse.error || comediesResponse.error ||
                dramasResponse.error || melodramasResponse.error) {
                return;
            }
            const randomMovie = selectRandomMovie([
                actionResponse.body.movies || [],
                comediesResponse.body.movies || [],
                dramasResponse.body.movies || [],
                melodramasResponse.body.movies || [],
                advResponse.body.movies || [],
                animResponse.body.movies || [],
                crimeResponse.body.movies || [],
                detectResponse.body.movies || [],
                fantasticResponse.body.movies || [],
                fanResponse.body.movies || [],
                horrResponse.body.movies || [],
                militResponse.body.movies || [],
                thrillResponse.body.movies || [],
                westResponse.body.movies || [],
            ],
            );

            const contentData: ContextData = {
                genre: null,
                singleGenre: false,
                preview: randomMovie,
                blocks: [
                    {
                        title: Genres.actions.name,
                        content: actionResponse.body.movies || [],
                    },
                    {
                        title: Genres.comedies.name,
                        content: comediesResponse.body.movies || [],
                    },
                    {
                        title: Genres.dramas.name,
                        content: dramasResponse.body.movies || [],
                    },
                    {
                        title: Genres.melodramas.name,
                        content: melodramasResponse.body.movies || [],
                    },
                    {
                        title: Genres.western.name,
                        content: westResponse.body.movies || [],
                    },
                    {
                        title: Genres.thrillers.name,
                        content: thrillResponse.body.movies || [],
                    },
                    {
                        title: Genres.military.name,
                        content: militResponse.body.movies || [],
                    },
                    {
                        title: Genres.horrors.name,
                        content: horrResponse.body.movies || [],
                    },
                    {
                        title: Genres.fantasy.name,
                        content: fanResponse.body.movies || [],
                    },
                    {
                        title: Genres.fantastic.name,
                        content: fantasticResponse.body.movies || [],
                    },
                    {
                        title: Genres.detective.name,
                        content: detectResponse.body.movies || [],
                    },
                    {
                        title: Genres.criminal.name,
                        content: crimeResponse.body.movies || [],
                    },
                    {
                        title: Genres.animation.name,
                        content: animResponse.body.movies || [],
                    },
                    {
                        title: Genres.adventures.name,
                        content: advResponse.body.movies || [],
                    },
                ],
            };

            this.view.insertIntoContext(contentData);
            this.view.show();
            this.onSwitchOn(data);
        }).catch((error: Error) => console.log(error));
    }

    onSwitchOn(data: any = {}) {
        super.onSwitchOn();

        if (data.modalStatus) {
            ModalService.show(data.modalStatus);
        }
    }

    switchOff() {
        eventBus.off(Events.OpenSubMenuGenres, this.onOpenSubMenuGenres);
        super.switchOff();
        this.view.hide();
    }

    showGenrePage = (index: number) => {
        const genre = GetGenreNameById(index);
        MovieModel.getMoviesByGenre(index, 15).then((response) => {
            if (response.error) {
                return;
            }

            eventBus.emit(Events.CheckSession, {});

            const contentData: Context = {
                content: response.body.movies || [],
                genre: genre,
                singleGenre: true,
            };

            this.view.insertIntoContext(contentData);
            this.view.show();
        }).catch((error: Error) => console.log(error));
    }

    onOpenSubMenuGenres = () => {
        const subMenu = new SubMenuPopup({contentType: 'movies'}, document.querySelector('.genres'));
        this.view.insertIntoContext({SubMenu: subMenu.render()});
    }
}

export default MoviesController;
