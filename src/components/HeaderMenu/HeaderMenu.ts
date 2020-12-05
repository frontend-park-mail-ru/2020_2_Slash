import Component from '../Component';
import Context from '../../tools/Context';
import template from './HeaderMenu.hbs';
import {CreateDomElement} from "../../tools/helper";
import eventBus from "../../services/EventBus";
import Events from "../../consts/events";
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

    onUpdateHeaderNav(authorized: boolean = false) {
        const myListButton = document.querySelector('.my-list');

        if (authorized) {
            const li = document.createElement('li');
            const a = CreateDomElement('a', {
                'class': 'list-item-text my-list',
                'href': '/mylist',
            });
            a.innerText = 'Мой список';

            const navBar = document.querySelector('.header-sub-menu__list');
            if (navBar) {
                document.querySelector('.header-sub-menu__list').appendChild(li).appendChild(a);
            }
            return;
        }

        if (!authorized && myListButton) {
            myListButton.remove();
        }
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        this.context.authorized = localStorage.getItem('authorized');
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = this.template(this.context);
        modalDiv.classList.add('header__sub-menu');
        this.parent.appendChild(modalDiv);
        if (this.context.authorized === 'true') {
            this.onUpdateHeaderNav(true);
        }
    }
}

export default HeaderMenu;
