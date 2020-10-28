import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import {ButtonDataType, InputsDataType} from "../type";

class FormBuilder {
    constructor() {}
    public inputs: HTMLInputElement[];
    public button: Button;

    setInputs(inputsData: InputsDataType[]) {
        this.inputs = Array.from(inputsData, (input: InputsDataType) => new Input(input).render());
    }

    setButton(buttonData: ButtonDataType) {
        this.button = new Button(buttonData);
    }
}

export default FormBuilder;
