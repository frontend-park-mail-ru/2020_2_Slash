import CustomObject from '../customInterfaces/customObject'

interface IController{
    switchOn(data: CustomObject): void

    onSwitchOn(data: CustomObject): void

    switchOff(): void
}

export default IController;
