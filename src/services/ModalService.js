import Modals from '../consts/modals.js';
import SignupBuilderForm from '../tools/builders/SignupFormBuilder.js';
import Popup from '../components/Popup/Popup.js';

class ModalService {
    constructor() {
        if (ModalService.__instance) {
            return ModalService.__instance;
        }

        ModalService.__instance = this;
        this.app = document.querySelector('.application');
    }

    show(modalStatus) {
        if (modalStatus === Modals.signup) {
            const signupPopup = new Popup({
                parent: this.app,
                context: {
                    heading: SignupBuilderForm.getMeta().heading,
                    Form: SignupBuilderForm.getForm().render(),
                    helper: SignupBuilderForm.getMeta().helper,
                },
            });

            const popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = signupPopup.render();
            this.app.appendChild(popup);

            document.body.classList.add('scroll-off');
        }
    }
}

export default new ModalService();
