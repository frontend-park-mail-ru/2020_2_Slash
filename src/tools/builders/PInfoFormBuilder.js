import FormBuilder from './FormBuilder.js';
import Form from '../../components/Form/Form';

class PInfoFormBuilder extends FormBuilder {
    constructor() {
        super();
        this.prepareFormData();
    }

    prepareFormData() {
        this.buttonData = {
            type: 'submit',
            text: 'Сохранить',
            formType: 'profileInfo',
            eventType: 'submitProfileForm',
        };

        this.inputsData = [
            {
                id: 'nickname',
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
            Button: this.button.render(),
            inputs: this.inputs,
        });
    }

    set(data) {
        this.inputsData.forEach((input) => {
            data.forEach((item) => {
                if (input.id === item.id) {
                    input.value = item.value;
                }
            });
        });

        return this;
    }
}

export default new PInfoFormBuilder();
