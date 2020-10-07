import FormBuilder from './FormBuilder.js';
import Form from '../../components/Form/Form.js';
import Button from '../../components/Button/Button.js';

class PSecurityFormBuilder extends FormBuilder {
    constructor() {
        super();
        this.prepareFormData();
    }

    prepareFormData() {
        this.buttonData = new Button({
            context: {
                type: 'submit',
                text: 'Сохранить',
                formType: 'profileSecurity',
                eventType: 'submitProfileForm',
            },
        });

        this.inputsData = [
            {
                id: 'oldPassword',
                type: 'password',
                label: 'Старый пароль',
            },
            {
                id: 'newPassword',
                type: 'password',
                label: 'Новый пароль',
            },
            {
                id: 'repeatedPassword',
                type: 'password',
                label: 'Повторить пароль',
            },
        ];
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
                Button: this.button.render(),
                inputs: this.inputs,
            },
        });
    }
}

export default new PSecurityFormBuilder();
