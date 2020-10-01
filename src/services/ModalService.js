import Modals from '../consts/modals.js';
import Popup from '../components/Popup/Popup.js';
import Button from '../components/Button/Button.js';
import Input from '../components/Input/Input.js';

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
            const button = new Button({
                context: {
                    type: 'submit',
                    text: 'Зарегистрироваться',
                },
            });

            const inputsData = [
                {
                    id: 'login',
                    type: 'text',
                    label: 'Логин',
                },
                {
                    id: 'email',
                    type: 'email',
                    label: 'E-mail',
                },
                {
                    id: 'password',
                    type: 'password',
                    label: 'Пароль',
                },
                {
                    id: 'repeat_password',
                    type: 'password',
                    label: 'Повторите пароль',
                },
            ];

            const inputs = Array.from(inputsData, (input) => new Input({context: input}).render());
            // console.log(inputs);

            const helper = {
                text: 'Уже зарегистрированы?',
                link: '#',
                linkText: 'Войти',
            };

            const signupPopup = new Popup({
                context: {
                    heading: 'Регистрация',
                    helper: helper,
                    Button: button.render(),
                    inputs: inputs,
                },
            });

            const popup = document.createElement('div');
            popup.innerHTML = signupPopup.render();
            this.app.appendChild(popup);
        }
    }
}

export default new ModalService();
