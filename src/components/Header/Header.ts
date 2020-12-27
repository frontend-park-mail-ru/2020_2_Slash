import Component from '../Component';
import Context from '../../tools/Context';
import template from './Header.hbs';
import Events from '../../consts/events';
import UserHeader from '../UserHeader/UserHeader';
import SearchInput from '../SearchInput/SearchInput';
import {CreateDomElement} from '../../tools/helper';
import {MOBILE_DEVICE_SIZE, TABLET_DEVICE_WIDTH} from '../../consts/other';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import EventBus from '../../services/EventBus';
import routes from '../../consts/routes';

/**
 * @class
 * Компонента хэдера
 */
class Header extends Component {
    public UserBlock: UserHeader;
    public SearchInput: SearchInput;
    private flag: boolean;
    private minWidth: number;
    private padding = 100;
    private baseItems: HTMLCollectionOf<Element>;

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

        if (!EventBus.getListeners().updateHeader) {
            EventBus.on(Events.UpdateHeader, this.onUpdate.bind(this));
            EventBus.on(Events.UpdateHeader, this.onUpdateHeaderNav.bind(this));
        }

        if (!EventBus.getListeners().showSearchLine) {
            EventBus.on(Events.ShowSearchLine, this.onSearchClick.bind(this));
        }

        if (!EventBus.getListeners().showNavMenu) {
            EventBus.on(Events.ShowNavMenu, this.onOpenBurger);
        }

        this.flag = true;

        this.minWidth = 850;
        this.baseItems = document.getElementsByClassName('list__li');

        window.addEventListener('resize', () => {
            this.fixHeaderMenu(this.padding);
        });
        EventBus.on(Events.FixHeader, () => {
            // может быть, что нужно отобразить <= 3 пункта меню
            // костыль, чтобы не придумывать цикл или делать рекурсию
            this.fixHeaderMenu(this.padding);
            this.fixHeaderMenu(this.padding);
            this.fixHeaderMenu(this.padding);
        });
    }

    checkSum = (items: HTMLCollectionOf<Element>) => {
        return Array.from(items).reduce((accumulator, {clientWidth}) => accumulator + clientWidth, 0);
    }

    fixHeaderMenu = (padding: number) => {
        let sum;

        if (window.innerWidth > TABLET_DEVICE_WIDTH) {
            const items = document.getElementsByClassName('li__visible');
            sum = this.checkSum(items);

            if (document.querySelector('.header__menu')) {
                const currentHeaderMenuW = document.querySelector('.header__menu').clientWidth || 0;
                const hiddenMenu = document.querySelector('.hidden__header-menu');
                const hiddenMenuWrapper = document.querySelector('.hidden__header-menu__wrapper');

                if (sum + padding >= currentHeaderMenuW) {
                    this.minWidth = currentHeaderMenuW;
                    const itemToHide = items.item(items.length - 1);
                    if (itemToHide) {
                        itemToHide.setAttribute('style', 'display: none');
                        itemToHide.classList.remove('li__visible');
                    }
                    if (hiddenMenu) {
                        hiddenMenu.classList.remove('hidden');
                        const HiddenA = itemToHide.getElementsByTagName('a')[0];

                        let myListClass = '';
                        if (HiddenA && HiddenA.pathname === routes.MyList) {
                            myListClass = 'my-list';
                        }

                        const li = CreateDomElement('li', {'class': `list__li ${myListClass}`});
                        const a = CreateDomElement('a', {
                            'class': 'list-item-text',
                            'href': `${HiddenA.pathname}`,
                        });
                        a.innerText = `${HiddenA.innerText}`;

                        li.appendChild(a);

                        hiddenMenuWrapper.appendChild(li);
                    }
                }

                if (this.minWidth <= currentHeaderMenuW - padding) {
                    const hiddenMenu = document.querySelector('.hidden__header-menu .hidden__header-menu__wrapper');
                    const hiddenItems = hiddenMenu.children;
                    if (hiddenItems.length > 0) {
                        hiddenMenu.removeChild(hiddenItems[hiddenItems.length - 1]);
                    }
                    document.querySelector('.hidden__header-menu').classList.add('hidden');

                    const itemToShow = this.baseItems.item(items.length);
                    if (itemToShow) {
                        itemToShow.setAttribute('style', 'display: block');
                        itemToShow.classList.add('li__visible');
                    }
                }
            }
        }
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

        // может быть, что нужно скрыть <= 3 пункта меню при открытии инпута поиска
        // костыль, чтобы не придумывать цикл или делать рекурсию
        this.fixHeaderMenu(this.padding);
        this.fixHeaderMenu(this.padding);
        this.fixHeaderMenu(this.padding);

        this.SearchInput.onRender();
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
            const li = CreateDomElement('li', {'class': 'my-list li__visible list__li'});
            const a = CreateDomElement('a', {
                'class': 'list-item-text',
                'href': '/mylist',
            });
            a.innerText = 'Мой список';

            const navBar = document.querySelector('.nav__list');
            if (navBar) {
                document.querySelector('.nav__list').appendChild(li).appendChild(a);
            }
            EventBus.emit(Events.FixHeader);
            return;
        }

        const myListButtons = document.querySelectorAll('.my-list');
        if (!authorized && myListButton) {
            myListButtons.forEach((item) => item.remove());
        }

        if (!document.querySelector('.hidden__header-menu__wrapper .list__li')) {
            document.querySelector('.hidden__header-menu').classList.add('hidden');
        }
    }

    render(): any {
        return super.render();
    }
}

export default Header;
