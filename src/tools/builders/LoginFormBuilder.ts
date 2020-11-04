import FormBuilder from './FormBuilder';
import Form from '../../components/Form/Form';
import {ButtonDataType, HelperDataType, InputsDataType} from '../type';


class LoginFormBuilder extends FormBuilder {
    private readonly heading: string;
    private readonly helper: HelperDataType;
    private buttonData: ButtonDataType;
    private inputsData: InputsDataType[];

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
        this.buttonData = {
            type: 'submit',
            text: 'Войти',
            formType: 'signin',
            eventType: 'submitForm',
        };


        this.inputsData = [
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
        this.setButton();
        this.setInputs();

        return new Form({
            heading: 'Авторизация',
            Button: this.button.render(),
            inputs: this.inputs,
        });
    }
}

export default new LoginFormBuilder();
