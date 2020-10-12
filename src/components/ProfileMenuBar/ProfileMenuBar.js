import BaseComponent from '../BaseComponent.js';
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events.ts';
import ValidationService from '../../services/ValidationService.js';
import Modals from '../../consts/modals.ts';
import template from './ProfileMenuBar.hbs';

/**
 * @class
 * Компонента для профиля - таббар и соответствущие формы
 */
class ProfileMenuBar extends BaseComponent {
    /**
     * Создает экземпляр ProfileMenuBar
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {ProfileMenuBar}
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = template;

        this.validator = new ValidationService();

        ProfileMenuBar.prototype._onSubmit = this.onSubmit.bind(this);
        EventBus.on(Events.SubmitProfileForm, this._onSubmit); // TODO: Отписываться, а потом вернуть Events.SubmitForm

        EventBus.on(Events.ProfileTabChanged, this.onTabChanged);
    }

    /**
     * Колбэк на изменение вкладки на таб баре
     * @param {Object} data - Данные для этого коллбэка
     */
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

    /**
     * Колбэк на отправку пользователем изменений - валидация данных в формах
     * @param {Object} data - Данные для этого коллбэка
     */
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

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        return this.template(this.context);
    }
}

export default ProfileMenuBar;
