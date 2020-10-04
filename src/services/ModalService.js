import Modals from '../consts/modals.js';
import SignupBuilderForm from '../tools/builders/SignupFormBuilder.js';
import LoginFormBuilder from '../tools/builders/LoginFormBuilder.js';
import Popup from '../components/Popup/Popup.js';
import EventBus from './EventBus.js';
import Events from '../consts/events.js';

class ModalService {
    constructor() {
        if (ModalService.__instance) {
            return ModalService.__instance;
        }

        ModalService.__instance = this;
        this.app = document.querySelector('.application');
        EventBus.on(Events.RevealPopup, this.onRevealPopup.bind(this));
    }

    onRevealPopup(data) {
        this.show(data.modalstatus);
    }

    deletePopup() {
        this.popup = null;
    }

    show(modalStatus) {
        let addListener = true;

        if (this.popup) {
            this.popup.remove();
            addListener = false;
        }

        if (modalStatus === Modals.signup) {
            this.popup = new Popup({
                addListener: addListener,
                parent: this.app,
                context: {
                    heading: SignupBuilderForm.getMeta().heading,
                    Form: SignupBuilderForm.getForm().render(),
                    helper: SignupBuilderForm.getMeta().helper,
                },
            });
        } else if (modalStatus === Modals.signin) {
            this.popup = new Popup({
                addListener: addListener,
                parent: this.app,
                context: {
                    heading: LoginFormBuilder.getMeta().heading,
                    Form: LoginFormBuilder.getForm().render(),
                    helper: LoginFormBuilder.getMeta().helper,
                },
            });
        }

        if (this.popup) {
            const popupDiv = document.createElement('div');
            popupDiv.classList.add('popup');
            popupDiv.innerHTML = this.popup.render();
            this.app.appendChild(popupDiv);
            document.body.classList.add('scroll-off');
        }
    }
}

export default new ModalService();
