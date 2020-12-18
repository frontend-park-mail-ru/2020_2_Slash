import Component from '../Component';
import Context from '../../tools/Context';
import template from './HeaderMenu.hbs';
import {CreateDomElement} from '../../tools/helper';
import {MOBILE_DEVICE_WIDTH} from '../../consts/other';
import EventBus from '../../services/EventBus';
import {Items, ItemsWithGuestMenu, ItemsWithUserMenu} from './MenuList';


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

        if (localStorage.getItem('authorized') == 'false') {
            this.context.avatar = '/static/img/user.svg';
        }
        document.querySelector('.application').addEventListener('click', this.onClick);

        if (!EventBus.getListeners().showUserList && window.innerWidth < MOBILE_DEVICE_WIDTH) {
            EventBus.on('showUserList', this.onShowUserList.bind(this));
        }
    }

    onShowUserList() {
        if (document.querySelector('.user__item')) {
            document.querySelector('.header-sub-menu__list').innerHTML = Items;
            this.onUpdateHeaderNav(localStorage.getItem('authorized') === 'true');
            document.querySelector('.header-sub-menu__user .header__user .header__arrow').setAttribute(
                'style', 'transform: rotate(0deg);');
            return;
        }

        if (localStorage.getItem('authorized') == 'false') {
            document.querySelector('.header-sub-menu__list').innerHTML = ItemsWithGuestMenu;
        } else {
            document.querySelector('.header-sub-menu__list').innerHTML = ItemsWithUserMenu;
        }

        document.querySelector('.header-sub-menu__user .header__user .header__arrow').setAttribute(
            'style', 'transform: rotate(180deg);');
        this.onUpdateHeaderNav(localStorage.getItem('authorized') === 'true');
    }

    onClick = (event: any) => {
        const {target} = event;
        if (window.innerWidth > MOBILE_DEVICE_WIDTH) {
            if (!target.classList.contains('header__sub-menu')) {
                this.remove();
            }
            return;
        }

        if (target.classList.contains('close-btn__img') || target.classList.contains('list-item-text')) {
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
        EventBus.off('showUserList', this.onShowUserList.bind(this));
    }

    onUpdateHeaderNav(authorized = false) {
        const myListButton = document.querySelector('.my-list');

        if (authorized) {
            const li = CreateDomElement('li', {
                'class': 'header-sub-menu__list__item',
            });
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
