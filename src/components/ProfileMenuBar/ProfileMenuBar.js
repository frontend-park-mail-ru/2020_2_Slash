import BaseComponent from '../BaseComponent.js';
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events.js';
import ValidationService from "../../services/ValidationService.js";
import Modals from "../../consts/modals.js";

class ProfileMenuBar extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['ProfileMenuBar.hbs'];

        ProfileMenuBar.prototype._onSubmit = this.onSubmit.bind(this);
        EventBus.on(Events.SubmitForm, this._onSubmit);

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

    onSubmit(data) {
        const [form] = document.querySelector('.active-form').getElementsByTagName('form');
        console.log(form)
        const validator = new ValidationService(form);

        let isValidForm = true;

        if (data.formtype === Modals.profileInfo) {
            isValidForm = validator.ValidateProfileInfoForm(form);
        }

        if (data.formtype === Modals.profileSecurity) {
            isValidForm = validator.ValidateProfileSecurityForm(form, data);
        }
    }
}

export default ProfileMenuBar;
