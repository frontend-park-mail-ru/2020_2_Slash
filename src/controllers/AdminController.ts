import Controller from './Controller';
import AdminView from '../views/AdminView/AdminView';
import AdminModel from '../models/AdminModel';
import {Error} from '../consts/errors';
import {ContRequest} from '../models/Requests';

class AdminController extends Controller {
    view: AdminView;

    constructor() {
        super(new AdminView());
    }

    switchOn(data: any = {}) {
        Promise.all([
            AdminModel.getDirectors(),
            AdminModel.getActors(),
            AdminModel.getCountries()]).then(([directorsResponse, actorsResponse, countriesResponse]) => {
            if (!directorsResponse.error && !actorsResponse.error && !countriesResponse.error) {
                data = {
                    directors: directorsResponse.body.directors,
                    actors: actorsResponse.body.actors,
                    countries: countriesResponse.body.countries,
                };
                this.view.insertIntoContext(data);
                this.view.show();
                this.onSwitchOn();
            }
        }).catch((error: Error) => console.log(error));
    }

    onSwitchOn(data?: any) {
        const btnDir = document.querySelector('.movie-form__dir-btn');
        btnDir.addEventListener('click', this.onBtnDir);

        const btnAct = document.querySelector('.movie-form__actors-btn');
        btnAct.addEventListener('click', this.onBtnAct);

        const btnCount = document.querySelector('.movie-form__count-btn');
        btnCount.addEventListener('click', this.onBtnCount);

        document.querySelector('.movie-btn__ok').addEventListener('click', this.onCreateMovie);

        super.onSwitchOn(data);
    }

    onCreateMovie = () => {
        const data: ContRequest = {
            name: document.querySelector('.movie-form__name').value,
            original_name: document.querySelector('.movie-form__origin-name').value,
            description: document.querySelector('.movie-form__desc').value,
            short_description: document.querySelector('.movie-form__short-desc').value,
            year: parseInt(document.querySelector('.movie-form__year').value),
            is_free: document.querySelector('.movie-form__free').checked,
            countries: [1, 2],
            genres: [1, 2],
            actors: [1, 2],
            directors: [1, 2],
        };
    }

    getActors = () => {
        const actors = document.querySelector('.selected-actors').textContent.split(', ');
        const actorsIds: number[] = [];

        actors.forEach((actor) => {
            if (actor !== '') {
                actorsIds.push(parseInt(actor));
            }
        });

        return actorsIds;
    }

    onBtnDir = () => {
        const btnDirWrapper = document.querySelector('.movie-from__dir-wrapper');
        const btnDirClassList = btnDirWrapper.querySelector('.dropdown-menu').classList;
        if (btnDirClassList.contains('hidden')) {
            btnDirClassList.remove('hidden');

            btnDirWrapper.addEventListener('click', (e: Event) => {
                const target = <HTMLInputElement>e.target;

                if (target.classList.contains('dropdown-menu__item')) {
                    target.classList.add('selected-li');
                    document.querySelector('.selected-directors').textContent += `${target.dataset.id}, `;
                }
            });
        } else {
            btnDirClassList.add('hidden');
        }
    }

    onBtnAct = () => {
        const actWrapper = document.querySelector('.movie-from__actors-wrapper');
        const btnActClassList = actWrapper.querySelector('.dropdown-menu').classList;
        if (btnActClassList.contains('hidden')) {
            btnActClassList.remove('hidden');

            actWrapper.addEventListener('click', (e: Event) => {
                const target = <HTMLInputElement>e.target;

                if (target.classList.contains('dropdown-menu__item')) {
                    target.classList.add('selected-li');
                    document.querySelector('.selected-actors').textContent += `${target.dataset.id}, `;
                }
            });
        } else {
            btnActClassList.add('hidden');
        }
    }

    onBtnCount = () => {
        const countWrapper = document.querySelector('.movie-from__count-wrapper');
        const btnCountClassList = countWrapper.querySelector('.dropdown-menu').classList;
        if (btnCountClassList.contains('hidden')) {
            btnCountClassList.remove('hidden');

            countWrapper.addEventListener('click', (e: Event) => {
                const target = <HTMLInputElement>e.target;

                if (target.classList.contains('dropdown-menu__item')) {
                    target.classList.add('selected-li');
                    document.querySelector('.selected-countries').textContent += `${target.dataset.id}, `;
                }
            });
        } else {
            btnCountClassList.add('hidden');
        }
    }
}

export default AdminController;
