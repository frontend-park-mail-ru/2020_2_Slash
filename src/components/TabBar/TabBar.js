import BaseComponent from '../BaseComponent.js';
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events.js';

class TabBar extends BaseComponent {
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

    render() {
        return this.template(this.context);
    }

    onTabChanged(data) {
        const selectedTab = 'list-item-text_selected';

        const oldTab = document.querySelector('div.tabs a.list-item-text_selected');
        oldTab.classList.remove(selectedTab);

        const currentTab = document.querySelector(`div.tabs a.tabs__list-item-text[data-tab='${data.tab}']`);
        currentTab.classList.add(selectedTab);
    }
}

export default TabBar;
