import FormBuilder from './FormBuilder.js';
import Form from '../../components/Form/Form.js';
import Button from '../../components/Button/Button.js';

class LoginFormBuilder extends FormBuilder {
    constructor() {
        super();
        this.prepareFormData();
        this.heading = 'Авторизация';
        this.helper = {
            text: 'Еще не зарегистрированы?',
            modal: 'signup',
            modalText: 'Зарегистрироваться',
        };
    }

    prepareFormData() {
        this.buttonData = new Button({
            context: {
                type: 'submit',
                text: 'Войти',
            },
        });

        this.inputsData = [
            {
                id: 'login',
                type: 'text',
                label: 'Логин или E-mail',
            },
            {
                id: 'password',
                type: 'password',
                label: 'Пароль',
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
            context: {
                heading: 'Авторизация',
                Button: this.button.render(),
                inputs: this.inputs,
            },
        });
    }
}

export default new LoginFormBuilder();
