import FormBuilder from './FormBuilder.js';
import Form from '../../components/Form/Form.js';
import Button from '../../components/Button/Button.js';

class PInfoFormBuilder extends FormBuilder {
    constructor() {
        super();
        this.prepareFormData();
    }

    prepareFormData() {
        this.buttonData = new Button({
            context: {
                type: 'submit',
                text: 'Сохранить',
                formType: 'profileInfo',
            },
        });

        this.inputsData = [
            {
                id: 'login',
                type: 'text',
                label: 'Никнейм',
            },
            {
                id: 'name',
                type: 'text',
                label: 'Имя',
            },
            {
                id: 'email',
                type: 'email',
                label: 'Почта',
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

export default new PInfoFormBuilder();
