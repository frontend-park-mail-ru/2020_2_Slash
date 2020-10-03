import Modals from '../consts/modals.js';
import Popup from '../components/Popup/Popup.js';
import Signup from './popups/Signup.js';

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
                    heading: 'Регистрация',
                    helper: Signup.helper,
                    Button: Signup.button.render(),
                    inputs: Signup.inputs,
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
