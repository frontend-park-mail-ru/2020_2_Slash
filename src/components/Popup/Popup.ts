import Component from '../Component';
import Context from '../../tools/Context';
import Modals from '../../consts/modals';
import Events from '../../consts/events';
import eventBus from '../../services/EventBus';
import ValidationService from '../../services/ValidationService';
import template from './Popup.hbs';
import {Error} from '../../consts/errors';

/**
 * @class
 * Компонента попапа
 */
class Popup extends Component {
    private _onSubmit: any;
    private _onClick: any;
    private validator: ValidationService;

    /**
     * Создает экземпляр Popup
     *
     * @constructor
     * @this  {Popup}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        this.validator = new ValidationService();

        Popup.prototype._onSubmit = this.onSubmit.bind(this);

        eventBus.on(Events.SubmitForm, this._onSubmit);

        this._onClick = function(event: any) {
            const {target} = event;
            if (target.classList.contains('popup-wrapper') || target.closest('.btn-close__img')) {
                this.remove();
            }
        }.bind(this);

        this.parent.addEventListener('click', this._onClick);
    }

    onSubmit(data: any) {
        const form = this.parent.getElementsByTagName('form')[0];

        let validationData: any = {};

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
                eventBus.emit(targetEvent, {
                    popup: this,
                    params: validationData.data,
                    formType: data.formtype,
                });
            }
        }
    }

    onError(error: Error, formType: string) {
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
        eventBus.off(Events.SubmitForm, this._onSubmit);
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
