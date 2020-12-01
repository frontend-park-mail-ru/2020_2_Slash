import Component from '../Component';
import Context from '../../tools/Context';
import template from './HeaderMenu.hbs';
/**
 * @class
 * Компонента окошка для хэдера - войти/зарегаться // профиль/выйти
 */
class HeaderMenu extends Component {
    /**
     * Создает экземпляр SubMenuPopup
     *
     * @constructor
     * @this  {SubMenuPopup}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
        this.context = context;

        document.querySelector('.application').addEventListener('click', this.onClick);
    }

    onClick = (event: any) => {
        const {target} = event;
        if (!target.classList.contains('header__sub-menu')) {
            this.remove();
        }
    };

    /**
     * Удаляет элемент в document
     */
    remove() {
        const modal = this.parent.querySelector('.header__sub-menu');
        if (modal) {
            modal.remove();
        }
        document.querySelector('.application').removeEventListener('click', this.onClick);
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = this.template(this.context);
        modalDiv.classList.add('header__sub-menu');
        this.parent.appendChild(modalDiv);
    }
}

export default HeaderMenu;
