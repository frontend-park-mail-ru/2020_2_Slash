import BaseComponent from '../BaseComponent.js';
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events.js';

/**
 * @class Компонента таббара
 */
class TabBar extends BaseComponent {
    /**
     * Создает экземпляр TabBar
     *
     * @constructor
     * @this  {TabBar}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['TabBar.hbs'];

        context.tabs.forEach((tab) => {
            if (tab.key === 'mainTab') {
                tab.class = 'list-item-text_selected';
            }
        });

        EventBus.on(Events.ContentInfoTabChanged, this.onTabChanged);
    }

    /**
     * Колбэк на изменение вкладки на таб баре
     * @param {Object} data - Данные для этого коллбэка
     */
    onTabChanged(data) {
        const selectedTab = 'list-item-text_selected';

        const oldTab = document.querySelector('div.tabs a.list-item-text_selected');
        oldTab.classList.remove(selectedTab);

        const currentTab = document.querySelector(`div.tabs a.tabs__list-item-text[data-tab='${data.tab}']`);
        currentTab.classList.add(selectedTab);
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        return this.template(this.context);
    }
}

export default TabBar;
