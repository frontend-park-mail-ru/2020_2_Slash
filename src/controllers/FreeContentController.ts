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
    currentCountries?: number[],
    currentGenres?: number[],
    currentYear?: string,
}

/**
 * @class
 * Контроллер для главной страницы
 */
class FreeContentController extends Controller {
    genres: number[];
    countries: number[];
    year: string;
    view: FreeContentView;

    constructor() {
        super(new FreeContentView());
        this.genres = [];
        this.countries = [];
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

        document.querySelector('.free__delete-btn').addEventListener('click', this.removeFilters);

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

        const {genreId} = target.dataset;

        const index = this.genres.indexOf(+genreId);
        if (index > -1) {
            this.genres.splice(index, 1);
            this.doQuery();
            return;
        }

        if (genreId) {
            this.genres.push(+genreId);
            this.doQuery();
        }
    }

    onClickYear = () => {
        const target = <HTMLInputElement>event.target;

        if (this.year === target.dataset.year) {
            this.year = '';
            this.doQuery();
            return;
        }

        if (target.classList.contains('free__year-item')) {
            this.year = target.dataset.year;
            this.doQuery();
        }
    }

    onClickCountry = () => {
        const target = <HTMLInputElement>event.target;

        const {countryId} = target.dataset;

        const index = this.countries.indexOf(+countryId);
        if (index > -1) {
            this.countries.splice(index, 1);
            this.doQuery();
            return;
        }

        if (countryId) {
            this.countries.push(+countryId);
            this.doQuery();
        }
    }

    removeFilters = () => {
        this.genres = [];
        this.countries = [];
        this.year = '';
        this.doQuery();
    }

    doQuery = () => {
        ContentModel.getContent({
            count: 100, isFree: true, genresIds: this.genres,
            countriesIds: this.countries, year: this.year,
        }).then((response: ResponseType) => {
            if (!response.error) {
                const {movies, tvshows} = response.body;

                const contentData: ContextData = {
                    content: movies.concat(tvshows),
                    currentCountries: this.countries,
                    currentGenres: this.genres,
                    currentYear: this.year,
                };

                this.view.insertIntoContext(contentData);
                this.view.updateContent();
            }
        }).catch((error: Error) => console.log(error));
    }
}

export default FreeContentController;
