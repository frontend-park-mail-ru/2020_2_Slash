import Component from '../Component';
import Context from '../../tools/Context';
import template from './SearchInput.hbs';
import eventBus from '../../services/EventBus';
import Events from '../../consts/events';
import Routes from '../../consts/routes';
import {MOBILE_DEVICE_WIDTH} from '../../consts/other';

/**
 * @class
 * Компонента фильма/сериала на главной странице
 */
class SearchInput extends Component {
    private input: any;
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
    }

    onClick = (event: any) => {
        const {target} = event;
        if (!target.classList.contains('search-line__input') && !target.classList.contains('header__search-img')) {
            this.remove();
        }
    };

    addRemove() {
        this.parent.addEventListener('click', this.onClick);
        this.input = document.querySelector('.search-line__input');
    }

    addPromptWindow() {
        this.input.addEventListener('keydown', this.onSearching.bind(this));
    }

    onSearching() {
        document.querySelector('.prompt-window').classList.remove('hidden');
    }

    addCallbackResult() {
        this.input.addEventListener('keydown', this.onEnter.bind(this));
    }

    onEnter(event: any) {
        if (event.keyCode === 13) {
            eventBus.emit(Events.PathChanged, {path: Routes.SearchPage});
            this.remove();
        }
    }

    remove() {
        if (window.innerWidth < 440) {
            document.querySelector('.blocker').classList.add('hidden');

            const page = document.querySelector('.scroll-fixed');
            if (page) {
                this.parent.innerHTML = page.innerHTML;
            }
        }
        const searchLine = document.querySelector('.search-line');
        if (searchLine) {
            searchLine.classList.add('hidden');
        }
        document.querySelector('.header__search-img').classList.remove('hidden');

        this.parent.removeEventListener('click', this.onClick);
        this.input.removeEventListener('keydown', this.onSearching);
        this.input.removeEventListener('keydown', this.onEnter.bind(this));
    }

    render() {
        if (window.innerWidth > MOBILE_DEVICE_WIDTH) {
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
