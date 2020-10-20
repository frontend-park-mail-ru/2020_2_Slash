import TBaseComponent from '../TBaseComponent';
import Context from "../../tools/Context";
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events';
import ValidationService from '../../services/ValidationService.js';
import Modals from '../../consts/modals';
import template from './ProfileMenuBar.hbs';

/**
 * @class
 * Компонента для профиля - таббар и соответствущие формы
 */
class ProfileMenuBar extends TBaseComponent {
    private validator: any;
    /**
     * Создает экземпляр ProfileMenuBar
     *
     * @constructor
     * @this  {ProfileMenuBar}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        this.validator = new ValidationService();

        ProfileMenuBar.prototype.onSubmit = this.onSubmit.bind(this);
        EventBus.on(Events.SubmitProfileForm, this.onSubmit); // TODO: Отписываться, а потом вернуть Events.SubmitForm

        EventBus.on(Events.ProfileTabChanged, this.onTabChanged);
    }

    /**
     * Колбэк на изменение вкладки на таб баре
     * @param {Object} data - Данные для этого коллбэка
     */
    onTabChanged(data: any) {
        const selectedTab = 'list-item-text_selected';
        const activeForm = 'active-form';
        const hiddenForm = 'hidden';
        const tabType = data.info;

        const oldTab = document.getElementsByClassName(selectedTab)[0];
        oldTab.classList.remove(selectedTab);

        const currentTab = document.getElementsByName(tabType)[0];
        currentTab.classList.add(selectedTab);

        const oldForm = document.getElementsByClassName(activeForm)[0];
        oldForm.classList.remove(activeForm);
        oldForm.classList.add(hiddenForm);

        const currentForm = document.getElementsByName(tabType + 'Form')[0];
        currentForm.classList.add(activeForm);
        currentForm.classList.remove(hiddenForm);
    }

    /**
     * Колбэк на отправку пользователем изменений - валидация данных в формах
     * @param {Object} data - Данные для этого коллбэка
     */
    onSubmit(data: any) {
        const form = document.querySelector('.active-form').getElementsByTagName('form')[0];

        let validationData: any = {};

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

    onError(error: string, formType: string) {
        const form = document.querySelector('.active-form').getElementsByTagName('form')[0];

        if (formType === Modals.profileInfo) {
            this.validator.ValidateProfileInfoForm(form, error);
        }

        if (formType === Modals.profileSecurity) {
            this.validator.ValidateProfileSecurityForm(form, error);
        }
    }
}

export default ProfileMenuBar;
