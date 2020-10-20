import FormBuilder from './FormBuilder.js';
import Form from '../../components/Form/Form';

class SignupFormBuilder extends FormBuilder {
    constructor() {
        super();
        this.prepareFormData();
        this.heading = 'Регистрация';
        this.helper = {
            text: 'Уже зарегистрированы?',
            modal: 'signin',
            modalText: 'Войти',
        };
    }

    prepareFormData() {
        this.buttonData = {
            type: 'submit',
            text: 'Зарегистрироваться',
            formType: 'signup',
            eventType: 'submitForm',
        }

        this.inputsData = [
            {
                id: 'nickname',
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
    }

    getMeta() {
        return {
            helper: this.helper,
            heading: this.heading,
        };
    }

    setInputs() {
        super.setInputs(this.inputsData);
    }

    setButton() {
        super.setButton(this.buttonData);
    }

    getForm() {
        this.setButton(this.button);
        this.setInputs(this.inputsData);

        return new Form({
                heading: 'Регистрация',
                Button: this.button.render(),
                inputs: this.inputs,
            });
    }
}

export default new SignupFormBuilder();
