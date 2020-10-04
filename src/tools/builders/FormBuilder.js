import Button from '../../components/Button/Button.js';
import Input from '../../components/Input/Input.js';

class FormBuilder {
    constructor() {}

    setInputs(inputsData) {
        this.inputs = Array.from(inputsData, (input) => new Input({context: input}).render());
    }

    setButton(buttonData) {
        this.button = new Button(buttonData);
    }
}

export default FormBuilder;
