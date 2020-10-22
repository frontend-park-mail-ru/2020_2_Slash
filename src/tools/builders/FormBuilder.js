import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

class FormBuilder {
    constructor() {}

    setInputs(inputsData) {
        this.inputs = Array.from(inputsData, (input) => new Input(input).render());
    }

    setButton(buttonData) {
        this.button = new Button(buttonData);
    }
}

export default FormBuilder;
