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

        eventBus.on(Events.OpenSubMenuGenres, this.onOpenSubMenuGenres.bind(this));
    }

    switchOn(data: any = {}) {
        if (data.query && data.query.has('genre')) {
            this.showGenrePage(data.query.get('genre'));
            return;
        }

        Promise.all([
            MovieModel.getMoviesByGenre(Genres.actions.id, 15),
            MovieModel.getMoviesByGenre(Genres.comedies.id, 15),
            MovieModel.getMoviesByGenre(Genres.dramas.id, 15),
            MovieModel.getMoviesByGenre(Genres.melodramas.id, 15),
        ]).then(([actionResponse, comediesResponse, dramasResponse, melodramasResponse]) => {
            if (actionResponse.error || comediesResponse.error ||
                dramasResponse.error || melodramasResponse.error) {
                return;
            }
            const randomMovie = selectRandomMovie([
                actionResponse.body.movies || [],
                comediesResponse.body.movies || [],
                dramasResponse.body.movies || [],
                melodramasResponse.body.movies || [],
            ],
            );

            const contentData: ContextData = {
                genre: null,
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
        super.switchOff();
        this.view.hide();
    }

    showGenrePage = (index: number) => {
        console.log(index)
        const genre = GetGenreNameById(index);
        MovieModel.getMoviesByGenre(index, 15).then((response) => {
            if (response.error) {
                return;
            }

            eventBus.emit(Events.CheckSession, {});

            const contentData: Context = {
                content: response.body.movies || [],
                genre: genre,
            };

            this.view.insertIntoContext(contentData);
            this.view.show();
        }).catch((error: Error) => console.log(error));
    }

    onOpenSubMenuGenres() {
        const subMenu = new SubMenuPopup({}, document.querySelector('.genres'));
        this.view.insertIntoContext({SubMenu: subMenu.render()});
    }
}

export default MoviesController;
