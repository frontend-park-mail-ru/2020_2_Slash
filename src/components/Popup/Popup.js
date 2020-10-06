import BaseComponent from '../BaseComponent.js';
import Modals from "../../consts/modals.js";
import EventBus from '../../services/EventBus.js';
import Events from '../../consts/events.js';
import ValidationService from '../../services/ValidationService.js';

class Popup extends BaseComponent {
    constructor({parent = null, context = {}, addListener = true} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['Popup.hbs'];

        if (Popup.__instance) {
            return Popup.__instance;
        }

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
        const validator = new ValidationService(form);

        let validationData = {};

        if (data.formtype === Modals.signup) {
            validationData = validator.ValidateSignupForm(form);
        }

        if (data.formtype === Modals.signin) {
            validationData = validator.ValidateLoginForm(form, data);
        }

        if (validationData.isValid) {
            if (data.formtype === Modals.signup) {
                EventBus.emit(Events.SignupUser, validationData.data)
            } else if (data.formtype === Modals.signin) {

            }

            this.remove();
        }
    }

    render() {
        const popupDiv = document.createElement('div');
        popupDiv.classList.add('popup');
        popupDiv.innerHTML = this.template(this.context);
        this.parent.appendChild(popupDiv);
        document.body.classList.add('scroll-off');
    }

    remove() {
        const popup = document.querySelector('.popup');
        document.body.classList.remove('scroll-off');
        if (popup) {
            this.parent.removeChild(popup);
            this.onDestroy();
        }
    }

    onDestroy() {
        this.parent.removeEventListener('click', this._onClick);
        EventBus.off(Events.SubmitForm, this._onSubmit);
        Popup.__instance = null;
    }
}

export default Popup;
