import FormBuilder from './FormBuilder';
import Form from '../../components/Form/Form';
import {ButtonDataType, InputsDataType} from "../type";

interface UserInfoBlock {
    id: string;
    value: string;
}

class PInfoFormBuilder extends FormBuilder {
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
        this.setButton();
        this.setInputs();

        return new Form({
            Button: this.button.render(),
            inputs: this.inputs,
        });
    }

    set(data: UserInfoBlock[]) {
        this.inputsData.forEach((input: InputsDataType) => {
            data.forEach((item: UserInfoBlock) => {
                if (input.id === item.id) {
                    input.value = item.value;
                }
            });
        });

        return this;
    }
}

export default new PInfoFormBuilder();
