import Component from '../Component';
import Context from '../../tools/Context';
import Events from '../../consts/events';
import EventBus from '../../services/EventBus';

import template from './TabBar.hbs';

/**
 * @class
 * Компонента таббара
 */
class TabBar extends Component {
    /**
     * Создает экземпляр TabBar
     *
     * @constructor
     * @this  {TabBar}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        context.tabs.forEach((tab: any) => {
            if (tab.key === 'mainTab') {
                tab.class = 'list-item-text_selected';
            }
        });

        const eventBus = EventBus.getInstance();
        eventBus.on(Events.ContentInfoTabChanged, this.onTabChanged);
    }

    /**
     * Колбэк на изменение вкладки на таб баре
     * @param {Object} data - Данные для этого коллбэка
     */
    onTabChanged(data: any) {
        const selectedTab = 'list-item-text_selected';

        const oldTab = document.querySelector('div.tabs a.list-item-text_selected');
        oldTab.classList.remove(selectedTab);

        const currentTab = document.querySelector(`div.tabs a.tabs__list-item-text[data-tab='${data.tab}']`);
        currentTab.classList.add(selectedTab);
    }
}

export default TabBar;
