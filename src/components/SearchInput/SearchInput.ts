import Component from '../Component';
import Context from '../../tools/Context';
import template from './SearchInput.hbs';
import Events from '../../consts/events';
import Routes from '../../consts/routes';
import {MOBILE_DEVICE_SIZE} from '../../consts/other';
import ContentModel from '../../models/ContentModel';
import {Error} from '../../consts/errors';
import EventBus from '../../services/EventBus';

interface resultType {
    name: string,
    id: number,
    type: string,
}

/**
 * @class
 * Компонента фильма/сериала на главной странице
 */
class SearchInput extends Component {
    private input: HTMLInputElement;
    private _onSearch: EventListenerOrEventListenerObject;
    private _onEnter: EventListenerOrEventListenerObject;
    private _onClick: EventListenerOrEventListenerObject;

    /**
     * Создает экземпляр SearchInput
     *
     * @constructor
     * @this  {SearchInput}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        this._onSearch = function() {
            this.onInputVal();
        }.bind(this);

        this._onEnter = function(event: any) {
            document.querySelector('.prompt-window').classList.remove('hidden');
            if (event.keyCode === 13) {
                this.search();
            }
        }.bind(this);

        this._onClick = function(event: any) {
            const {target} = event;

            if (document.querySelector('.search-line_visible')) {
                if (target.classList.contains('search-line__img')) {
                    this.search();
                    this.remove();
                    return;
                }
                if (!target.classList.contains('search-line__input') &&
                    !target.classList.contains('search-line__img') &&
                    !target.classList.contains('header__search-img')) {
                    this.remove();
                }
            }
        }.bind(this);
    }

    addRemove() {
        this.parent.addEventListener('click', this._onClick);
        this.input = document.querySelector('.search-line__input');
    }

    addCallbackResult() {
        if (!this.input) {
            window.history.go(0);
        }
        this.input.addEventListener('input', this._onSearch);
        this.input.addEventListener('keydown', this._onEnter);
    }

    search() {
        const misc = {
            query: this.input.value,
        };

        if (this.input.value !== '') {
            EventBus.emit(Events.PathChanged, {path: `${Routes.SearchPage}?query=${this.input.value}`, misc});
        }

        this.remove();
    }

    remove() {
        this.parent.removeEventListener('click', this._onClick);
        this.input.removeEventListener('input', this._onSearch);
        this.input.removeEventListener('keydown', this._onEnter);

        const blocker = document.querySelector('.blocker');

        if (window.innerWidth <= MOBILE_DEVICE_SIZE || blocker) {
            if (blocker) {
                blocker.classList.add('hidden');
            }

            const page = document.querySelector('.scroll-fixed');
            if (page) {
                this.parent.innerHTML = page.innerHTML;
            }
        }

        const searchLine = document.querySelector('.search-line');
        if (searchLine) {
            searchLine.classList.remove('search-line_visible');
            searchLine.classList.add('hidden');
        }

        const icon = document.querySelector('.header__search-img');
        if (icon) {
            icon.classList.remove('hidden');
        }

        EventBus.emit(Events.FixHeader);
        EventBus.emit(Events.FixHeader);
        EventBus.emit(Events.FixHeader);
    }

    onRender = () => {
        if (this.input.value !== '') {
            document.querySelector('.prompt-window').classList.remove('hidden');
            this.onInputVal();
            return;
        }
    }

    onInputVal = () => {
        if (this.input.value !== '') {
            ContentModel.search(this.input.value, 5).then((response) => {
                if (!response.error) {
                    const {result} = response.body;

                    const found: resultType[] = [];
                    result.actors.forEach((actor: any) => found.push({
                        name: actor.name,
                        id: actor.id,
                        type: 'actor',
                    }));
                    result.movies.forEach((movie: any) => found.push({
                        name: movie.name, id:
                        movie.id,
                        type: 'movie',
                    }));
                    result.tv_shows.forEach((tvShow: any) => found.push({
                        name: tvShow.name,
                        id: tvShow.id,
                        type: 'serial',
                    }));

                    if (this.input.value) {
                        const items: string[] = [];
                        const max = Math.max(found.length, 10);

                        found.slice(0, max).forEach((foundItem) => {
                            if (foundItem.type === 'actor') {
                                items.push(`<a href="/${foundItem.type}/${foundItem.id}" 
                            class="prompt-window__label">${foundItem.name}</a>`);
                            } else if (foundItem.type === 'movie') {
                                items.push(`<a href="${window.location.pathname}?mid=${foundItem.id}" 
                            class="prompt-window__label">${foundItem.name}</a>`);
                            } else {
                                items.push(`<a href="${window.location.pathname}?sid=${foundItem.id}" 
                            class="prompt-window__label">${foundItem.name}</a>`);
                            }
                        });

                        document.querySelector('.prompt-window').setAttribute('style',
                            'opacity:1;');
                        document.querySelector('.prompt-window__labels').innerHTML = items.join(' ');
                    }
                    if (!this.input.value || (result.actors.length + result.movies.length +
                        result.tv_shows.length === 0)) {
                        document.querySelector('.prompt-window').setAttribute('style',
                            'opacity:0;');
                    }
                }
            }).catch((error: Error) => console.log(error));
        }
    }

    render() {
        if (window.innerWidth > MOBILE_DEVICE_SIZE) {
            return super.render();
        } else {
            const page = document.createElement('div');
            page.classList.add('scroll-fixed');
            page.innerHTML = this.parent.innerHTML;
            this.parent.innerHTML = '';
            this.parent.appendChild(page);

            const popupDiv = document.createElement('div');
            popupDiv.classList.add('search-popup');

            popupDiv.innerHTML = this.template(this.context);
            this.parent.appendChild(popupDiv);

            document.querySelector('.blocker').classList.remove('hidden');
        }
    }
}

export default SearchInput;
