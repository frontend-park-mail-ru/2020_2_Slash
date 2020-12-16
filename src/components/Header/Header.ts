import Component from '../Component';
import Context from '../../tools/Context';
import template from './Header.hbs';
import eventBus from '../../services/EventBus';
import Events from '../../consts/events';
import UserHeader from '../UserHeader/UserHeader';
import SearchInput from '../SearchInput/SearchInput';
import {CreateDomElement} from '../../tools/helper';
import {MOBILE_DEVICE_SIZE} from '../../consts/other';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

/**
 * @class
 * Компонента хэдера
 */
class Header extends Component {
    public UserBlock: UserHeader;
    public SearchInput: SearchInput;
    private flag: boolean;
    /**
     * Создает экземпляр Header
     *
     * @constructor
     * @this  {Header}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        this.UserBlock = new UserHeader(this.context);
        this.context.UserBlock = this.UserBlock.render();

        this.SearchInput = new SearchInput(this.context, document.querySelector('.application'));
        this.context.SearchInput = this.SearchInput.render();

        if (!eventBus.getListeners().updateHeader) {
            eventBus.on(Events.UpdateHeader, this.onUpdate.bind(this));
            eventBus.on(Events.UpdateHeader, this.onUpdateHeaderNav.bind(this));
        }

        if (!eventBus.getListeners().showSearchLine) {
            eventBus.on(Events.ShowSearchLine, this.onSearchClick.bind(this));
        }

        if (!eventBus.getListeners().showNavMenu) {
            eventBus.on(Events.ShowNavMenu, this.onOpenBurger);
        }

        this.flag = true;
    }

    onOpenBurger = () => {
        if (!document.querySelector('.header-sub-menu__wrapper')) {
            this.context.Menu = new HeaderMenu(this.context, document.querySelector('.application')).render();
        }
    }

    onSearchClick() {
        if (window.innerWidth <= MOBILE_DEVICE_SIZE) {
            this.SearchInput.render();
        }

        this.SearchInput.addRemove();
        this.SearchInput.addCallbackResult();

        const searchLine = document.querySelector('.search-line');
        searchLine.classList.remove('hidden');
        searchLine.classList.add('search-line_visible');
        document.querySelector('.header__search-img').classList.add('hidden');
        const promptWindow = document.querySelector('.prompt-window');
        if (promptWindow) {
            promptWindow.classList.add('hidden');
        }
        document.getElementsByClassName('search-line__input')[0].focus();

        this.SearchInput.addResizeCallbacks();
    }

    onUpdate(data: any = {}) {
        this.context.authorized = data.authorized;
        this.context.avatar = data.avatar;
        const userBlock = document.querySelector('.header__user-block');

        if (userBlock) {
            userBlock.innerHTML = this.UserBlock.template(this.context);
        }
    }

    onUpdateHeaderNav(data: any = {}) {
        const {authorized} = data;
        const myListButton = document.querySelector('.my-list');

        if (authorized && !myListButton) {
            const li = CreateDomElement('li', {'class': 'li__visible list__li'});
            const a = CreateDomElement('a', {
                'class': 'my-list list-item-text',
                'href': '/mylist',
            });
            a.innerText = 'Мой список';

            const navBar = document.querySelector('.nav__list');
            if (navBar) {
                document.querySelector('.nav__list').appendChild(li).appendChild(a);
            }
            return;
        }

        if (!authorized && myListButton) {
            myListButton.remove();
        }
    }

    render(): any {
        return super.render();
    }
}

export default Header;
