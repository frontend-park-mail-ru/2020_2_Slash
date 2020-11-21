import Component from '../Component';
import Context from '../../tools/Context';
import template from './SearchInput.hbs';

/**
 * @class
 * Компонента фильма/сериала на главной странице
 */
class SearchInput extends Component {
    private _onClick: any;
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
    }

    remove() {
        document.querySelector('.search-line').classList.add('hidden');
        document.querySelector('.header__search-img').classList.remove('hidden');

        this.parent.removeEventListener('click', this._onClick);
    }
}

export default SearchInput;
