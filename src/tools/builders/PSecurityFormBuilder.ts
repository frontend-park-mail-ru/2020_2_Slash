import FormBuilder from './FormBuilder';
import Form from '../../components/Form/Form';
import {ButtonDataType, InputsDataType} from '../type';

class PSecurityFormBuilder extends FormBuilder {
    private buttonData: ButtonDataType;
    private inputsData: InputsDataType[];

    constructor() {
        super();
        this.prepareFormData();
    }

    prepareFormData() {
        this.buttonData = {
            type: 'submit',
            text: 'Сохранить',
            formType: 'profileSecurity',
            eventType: 'submitProfileForm',
        };

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
        this.setButton();
        this.setInputs();

        return new Form({
            Button: this.button.render(),
            inputs: this.inputs,
        });
    }
}

export default new PSecurityFormBuilder();
