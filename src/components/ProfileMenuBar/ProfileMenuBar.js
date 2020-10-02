import BaseComponent from '../BaseComponent.js';
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events.js';

class ProfileMenuBar extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['ProfileMenuBar.hbs'];

        EventBus.on(Events.ProfileTabChanged, this.onTabChanged);
    }

    render() {
        return this.template(this.context);
    }

    onTabChanged(data) {
        const selectedTab = 'list-item-text_selected';
        const activeForm = 'active-form';
        const hiddenForm = 'hidden';
       const  tabType = data.info;

        const [oldTab] = document.getElementsByClassName(selectedTab);
        oldTab.classList.remove(selectedTab);

        const [currentTab] = document.getElementsByName(tabType);
        currentTab.classList.add(selectedTab);

        const [oldForm] = document.getElementsByClassName(activeForm);
        oldForm.classList.remove(activeForm);
        oldForm.classList.add(hiddenForm);

        const [currentForm] = document.getElementsByName(tabType + 'Form');
        currentForm.classList.add(activeForm);
        currentForm.classList.remove(hiddenForm);
    }
}

export default ProfileMenuBar;
