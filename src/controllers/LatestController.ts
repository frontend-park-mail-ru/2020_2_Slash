import Controller from './Controller';
import LatestView from '../views/LatestView/LatestView';
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
class LatestController extends Controller {
    genres: number[];
    countries: number[];
    year: string;
    view: LatestView;

    constructor() {
        super(new LatestView());
        this.genres = [];
        this.countries = [];
    }

    byField(field: string) {
        return (a: any, b: any) => a[field] < b[field] ? 1 : -1;
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

                content.sort(this.byField('year'));

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

        document.querySelector('.filters__genre-items').addEventListener('click', this.onClickGenre);
        document.querySelector('.filters__years-items').addEventListener('click', this.onClickYear);
        document.querySelector('.filters__countries-items').addEventListener('click', this.onClickCountry);

        document.querySelector('.filters__delete-btn').addEventListener('click', this.removeFilters);

        document.querySelector('.filters__close-btn').addEventListener('click', this.onClickFilters);
    }

    switchOff() {
        super.switchOff();
        this.view.hide();
    }

    onClickFilters = () => {
        const filter = document.querySelector('.filters');
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

        if (target.classList.contains('filters__year-item')) {
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

                const content = movies.concat(tvshows);

                content.sort(this.byField('year'));

                const contentData: ContextData = {
                    content: content,
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

export default LatestController;
