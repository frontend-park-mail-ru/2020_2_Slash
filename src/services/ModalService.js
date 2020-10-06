import Modals from '../consts/modals.js';
import SignupBuilderForm from '../tools/builders/SignupFormBuilder.js';
import LoginFormBuilder from '../tools/builders/LoginFormBuilder.js';
import Popup from '../components/Popup/Popup.js';
import EventBus from './EventBus.js';
import Events from '../consts/events.js';
import ModalBuilder from "../tools/builders/ModalBuilder.js";

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

    show(modalStatus) {
        if (this.modal) {
            this.modal.remove();
        }

        switch (modalStatus) {
            case Modals.signup: {
                this.modal = new Popup({
                    parent: this.app,
                    context: {
                        heading: SignupBuilderForm.getMeta().heading,
                        Form: SignupBuilderForm.getForm().render(),
                        helper: SignupBuilderForm.getMeta().helper,
                    },
                });
                break;
            }
            case Modals.signin: {
                this.modal = new Popup({
                    parent: this.app,
                    context: {
                        heading: LoginFormBuilder.getMeta().heading,
                        Form: LoginFormBuilder.getForm().render(),
                        helper: LoginFormBuilder.getMeta().helper,
                    },
                });
                break;
            }
            case Modals.authMini: {
                this.modal = ModalBuilder.build(modalStatus);
                break;
            }
            case Modals.unauthMini: {
                this.modal = ModalBuilder.build(modalStatus);
                break;
            }
        }

        if (this.modal) {
            this.modal.render();
        }
    }
}

export default new ModalService();
