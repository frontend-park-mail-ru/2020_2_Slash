import BaseComponent from '../BaseComponent.js';
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events.js';
import ValidationService from '../../services/ValidationService.js';
import Modals from '../../consts/modals.js';

class ProfileMenuBar extends BaseComponent {
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['ProfileMenuBar.hbs'];

        this.validator = new ValidationService();

        ProfileMenuBar.prototype._onSubmit = this.onSubmit.bind(this);
        EventBus.on(Events.SubmitProfileForm, this._onSubmit); // TODO: Отписываться, а потом вернуть Events.SubmitForm

        EventBus.on(Events.ProfileTabChanged, this.onTabChanged);
    }

    render() {
        return this.template(this.context);
    }

    onTabChanged(data) {
        const selectedTab = 'list-item-text_selected';
        const activeForm = 'active-form';
        const hiddenForm = 'hidden';
        const tabType = data.info;

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

        let validationData = {};

        if (data.formtype === Modals.profileInfo) {
            validationData = this.validator.ValidateProfileInfoForm(form);
        }

        if (data.formtype === Modals.profileSecurity) {
            validationData = this.validator.ValidateProfileSecurityForm(form, data);
        }

        if (validationData.isValid) {
            const targetEvent = data.formtype === Modals.profileInfo ? Events.UpdateProfile : null;

            if (targetEvent) {
                EventBus.emit(targetEvent, {
                    params: validationData.data,
                    formType: data.formtype,
                    form: this,
                });
            }
        }
    }

    onError(error, formType) {
        const [form] = document.querySelector('.active-form').getElementsByTagName('form');

        if (formType === Modals.profileInfo) {
            this.validator.ValidateProfileInfoForm(form, error);
        }

        if (formType === Modals.profileSecurity) {
            this.validator.ValidateProfileSecurityForm(form, error);
        }
    }
}

export default ProfileMenuBar;
