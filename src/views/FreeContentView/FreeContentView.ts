import View from '../View';
import Context from '../../tools/Context';
import template from './FreeContentView.hbs';
import Grid from '../../components/Grid/Grid';
import {Genres} from '../../consts/genres';

class FreeContentView extends View {
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
        };

        this.insertIntoContext(data);
        super.show(this.template(data));
    }

    updateContent() {
        const countryItems = document.querySelectorAll('.free__country-item');
        if (countryItems) {
            countryItems.forEach((item) => item.setAttribute('style',
                'color: var(--white); background-color: var(--highly-transparent-white);'));
        }

        const currentCountry = document.querySelector(
            `.free__items [data-country-id="${this.context.currentCountry}"]`);
        if (currentCountry) {
            currentCountry.setAttribute('style',
                'color: var(--shadow); background-color: var(--low-transparent-white);');
        }

        const genreItems = document.querySelectorAll('.free__genre-item');
        if (genreItems) {
            genreItems.forEach((item) => item.setAttribute('style',
                'color: var(--white); background-color: var(--highly-transparent-white);'));
        }

        const currentGenre = document.querySelector(
            `.free__items [data-genre-id="${this.context.currentGenre}"]`);
        if (currentGenre) {
            currentGenre.setAttribute('style',
                'color: var(--shadow); background-color: var(--low-transparent-white);');
        }

        const yearsItems = document.querySelectorAll('.free__year-item');
        if (yearsItems) {
            yearsItems.forEach((item) => item.setAttribute('style',
                'color: var(--white); background-color: var(--highly-transparent-white);'));
        }

        const currentYear = document.querySelector(`.free__items [data-year="${this.context.currentYear}"]`);
        if (currentYear) {
            currentYear.setAttribute('style',
                'color: var(--shadow); background-color: var(--low-transparent-white);');
        }

        const grid = new Grid({
            content: this.context.content,
        });

        document.querySelector('.free__content-wrapper').innerHTML = grid.render();
    }
}

export default FreeContentView;
