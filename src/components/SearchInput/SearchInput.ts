import Component from '../Component';
import Context from '../../tools/Context';
import template from './SearchInput.hbs';
import eventBus from "../../services/EventBus";
import Events from "../../consts/events";
import Routes from "../../consts/routes";

/**
 * @class
 * Компонента фильма/сериала на главной странице
 */
class SearchInput extends Component {
    private _onClick: any;
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

    addRemove() {
        this._onClick = function(event: any) {
            const {target} = event;
            if (!target.classList.contains('search-line__input') && !target.classList.contains('header__search-img')) {
                this.remove();
            }
        }.bind(this);

        this.parent.addEventListener('click', this._onClick);
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
        document.querySelector('.search-line').classList.add('hidden');
        document.querySelector('.header__search-img').classList.remove('hidden');

        this.parent.removeEventListener('click', this._onClick);
        this.input.removeEventListener('keydown', this.onSearching);
        this.input.removeEventListener('keydown', this.onEnter.bind(this));
    }
}

export default SearchInput;
