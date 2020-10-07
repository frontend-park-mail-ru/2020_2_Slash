import BaseComponent from '../BaseComponent.js';
import Modals from '../../consts/modals.js';
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events.js';
import ValidationService from '../../services/ValidationService.js';

/**
 * @class
 * Компонента попапа
 */
class Popup extends BaseComponent {
    /**
     * Создает экземпляр MiniModal
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {MiniModal}
     */
    constructor({parent = null, context = {}, addListener = true} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Popup.hbs'];

        if (Popup.__instance) {
            return Popup.__instance;
        }

        this.validator = new ValidationService();

        Popup.prototype._onSubmit = this.onSubmit.bind(this);
        EventBus.on(Events.SubmitForm, this._onSubmit);

        Popup.__instance = this;
        Popup.prototype._onClick = function(event) {
            const {target} = event;
            if (target.classList.contains('popup-wrapper') || target.closest('.btn-close__img')) {
                this.remove();
            }
        }.bind(this);

        this.parent.addEventListener('click', this._onClick);
    }

    onSubmit(data) {
        const form = this.parent.getElementsByTagName('form')[0];

        let validationData = {};

        if (data.formtype === Modals.signup) {
            validationData = this.validator.ValidateSignupForm(form);
        }

        if (data.formtype === Modals.signin) {
            validationData = this.validator.ValidateLoginForm(form);
        }

        if (validationData.isValid) {
            let targetEvent = data.formtype === Modals.signup ? Events.SignupUser : null;
            targetEvent = data.formtype === Modals.signin ? Events.LoginUser : targetEvent;

            if (targetEvent) {
                // TODO: Popup.__instance не валиден внутри колбэка EventBus'a - нужно додумать, как удалить событие
                EventBus.emit(targetEvent, {
                    popup: Popup.__instance,
                    params: validationData.data,
                    formType: data.formtype,
                });
            }
        }
    }

    onError(error, formType) {
        const form = this.parent.getElementsByTagName('form')[0];

        if (formType === Modals.signup) {
            this.validator.ValidateSignupForm(form, error);
        }

        if (formType === Modals.signin) {
            this.validator.ValidateLoginForm(form, error);
        }
    }

    /**
     * Удаляет попап в document
     */
    remove() {
        const popup = document.querySelector('.popup');
        document.body.classList.remove('scroll-off');
        if (popup) {
            this.parent.removeChild(popup);
            this.onDestroy();
        }
    }

    /**
     * Коллбэк на удаление элемента Popup со страницы
     */
    onDestroy() {
        this.parent.removeEventListener('click', this._onClick);
        EventBus.off(Events.SubmitForm, this._onSubmit);
        Popup.__instance = null;
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        const popupDiv = document.createElement('div');
        popupDiv.classList.add('popup');
        popupDiv.innerHTML = this.template(this.context);
        this.parent.appendChild(popupDiv);
        document.body.classList.add('scroll-off');
    }
}

export default Popup;
