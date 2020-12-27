import View from '../View';
import Context from '../../tools/Context';
import template from './LatestView.hbs';
import Grid from '../../components/Grid/Grid';
import {Genres} from '../../consts/genres';
import FiltersBlock from '../../components/FiltersBlock/FiltersBlock';

class LatestView extends View {
    private parent: any;

    constructor(title = 'Flicks box', context = {}) {
        super(title, context);
        this.template = template;
        this.parent = document.querySelector('.application');
    }

    show() {
        const grid = new Grid({
            content: this.context.content,
        });

        this.context.genres = Object.entries(Genres).map((elem) => elem[1]);

        const data: Context = {
            Content: grid.render(),
            Genres: this.context.genres,
            Years: this.context.years,
            Countries: this.context.countries,
            FiltersBlock: new FiltersBlock(this.context).render(),
        };

        this.insertIntoContext(data);
        super.show(this.template(data));
    }

    updateContent() {
        const countryItems = document.querySelectorAll('.filters__country-item');
        if (countryItems) {
            countryItems.forEach((item) => item.setAttribute('style',
                'color: var(--white); background-color: var(--highly-transparent-white);'));
        }

        this.context.currentCountries.forEach((country: any) => {
            const currentCountry = document.querySelector(`.filters__items [data-country-id="${country}"]`);
            currentCountry.setAttribute('style',
                'color: var(--shadow); background-color: var(--low-transparent-white);');
        });

        const genreItems = document.querySelectorAll('.filters__genre-item');
        if (genreItems) {
            genreItems.forEach((item) => item.setAttribute('style',
                'color: var(--white); background-color: var(--highly-transparent-white);'));
        }

        this.context.currentGenres.forEach((genre: any) => {
            const currentGenre = document.querySelector(`.filters__items [data-genre-id="${genre}"]`);
            currentGenre.setAttribute('style',
                'color: var(--shadow); background-color: var(--low-transparent-white);');
        });

        const yearsItems = document.querySelectorAll('.filters__year-item');
        if (yearsItems) {
            yearsItems.forEach((item) => item.setAttribute('style',
                'color: var(--white); background-color: var(--highly-transparent-white);'));
        }

        const currentYear = document.querySelector(`.filters__items [data-year="${this.context.currentYear}"]`);
        if (currentYear) {
            currentYear.setAttribute('style',
                'color: var(--shadow); background-color: var(--low-transparent-white);');
        }

        const grid = new Grid({
            content: this.context.content,
        });

        document.querySelector('.latest__content-wrapper').innerHTML = grid.render();
    }
}

export default LatestView;
