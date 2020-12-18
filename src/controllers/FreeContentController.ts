import Controller from './Controller';
import FreeContentView from '../views/FreeContentView/FreeContentView';
import ModalService from '../services/ModalService';
import ContentModel from '../models/ContentModel';
import {Error} from '../consts/errors';
import ResponseType from '../tools/ResponseType';

interface ContextData {
    content: { [key: string]: string }[],
    years?: number[],
    countries?: string[],
    currentCountry?: number,
    currentGenre?: number,
    currentYear?: string,
}

/**
 * @class
 * Контроллер для главной страницы
 */
class FreeContentController extends Controller {
    genre: number;
    country: number;
    year: string;
    view: FreeContentView;

    constructor() {
        super(new FreeContentView());
    }

    switchOn() {
        Promise.all([
            ContentModel.getContent({count: 100, isFree: true}),
            ContentModel.getCountries()]).then(([contentResponse, countriesResponse]) => {
            if (!contentResponse.error && !countriesResponse.error) {
                const {movies, tvshows} = contentResponse.body;

                const content = movies.concat(tvshows);

                let years: number[] = [];
                content.forEach((cont: any) => years.push(cont.year));
                years = years.filter((item, index) => years.indexOf(item) === index);

                const {countries} = countriesResponse.body;

                const contentData: ContextData = {
                    content: content,
                    years: years.sort((a, b) => b - a),
                    countries: countries,
                };

                this.view.insertIntoContext(contentData);
                this.view.show();
                this.onSwitchOn();
            }
        }).catch((error: Error) => console.log(error));
    }

    onSwitchOn(data: any = {}) {
        super.onSwitchOn();

        if (data.modalStatus) {
            ModalService.show(data.modalStatus);
        }

        document.querySelector('.filter-btn').addEventListener('click', this.onClickFilters);


        document.querySelector('.free__genre-items').addEventListener('click', this.onClickGenre);
        document.querySelector('.free__years-items').addEventListener('click', this.onClickYear);
        document.querySelector('.free__countries-items').addEventListener('click', this.onClickCountry);

        document.querySelector('.free__delete-genres').addEventListener('click', this.removeGenreFilters);
        document.querySelector('.free__delete-years').addEventListener('click', this.removeYearsFilters);
        document.querySelector('.free__delete-countries').addEventListener('click', this.removeCountriesFilters);

        document.querySelector('.free__close-btn').addEventListener('click', this.onClickFilters);
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
    }

    onClickFilters = () => {
        const filter = document.querySelector('.free__filters');
        if (filter.classList.contains('hidden')) {
            filter.classList.remove('hidden');
            document.querySelector('.filter-btn__arrow').setAttribute('style', 'transform: rotate(180deg);');
        } else {
            filter.classList.add('hidden');
            document.querySelector('.filter-btn__arrow').setAttribute('style', 'transform: rotate(0deg);');
        }
    }

    onClickGenre = () => {
        const target = <HTMLInputElement>event.target;

        if (target.dataset.genreId) {
            this.genre = +target.dataset.genreId;
            this.doQuery();
        }
    }

    onClickYear = () => {
        const target = <HTMLInputElement>event.target;

        if (target.classList.contains('free__year-item')) {
            this.year = target.dataset.year;
            this.doQuery();
        }
    }

    onClickCountry = () => {
        const target = <HTMLInputElement>event.target;

        if (target.dataset.countryId) {
            this.country = +target.dataset.countryId;
            this.doQuery();
        }
    }

    removeGenreFilters = () => {
        this.genre = 0;
        this.doQuery();
    }

    removeYearsFilters = () => {
        this.year = '';
        this.doQuery();
    }

    removeCountriesFilters = () => {
        this.country = 0;
        this.doQuery();
    }

    doQuery = () => {
        ContentModel.getContent({count: 100, isFree: true, genreId: this.genre, country: this.country, year: this.year})
            .then((response: ResponseType) => {
                if (!response.error) {
                    const {movies, tvshows} = response.body;

                    const contentData: ContextData = {
                        content: movies.concat(tvshows),
                        currentCountry: this.country,
                        currentGenre: this.genre,
                        currentYear: this.year,
                    };

                    this.view.insertIntoContext(contentData);
                    this.view.updateContent();
                }
            }).catch((error: Error) => console.log(error));
    }
}

export default FreeContentController;
