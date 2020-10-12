import IController from './IController';
import IView from '../views/IView';
import CustomObject from "../customInterfaces/customObject";

class TBaseController implements IController {
    view: IView;
    constructor(view: IView) {
        this.view = view;
    }

    switchOn(data: CustomObject) {}

    onSwitchOn(data: CustomObject) {}

    switchOff() {}
}

export default TBaseController;
