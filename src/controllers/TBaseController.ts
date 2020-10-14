import IController from './IController';
import IView from '../views/IView';

class TBaseController implements IController {
    view: IView;
    constructor(view: IView) {
        this.view = view;
    }

    switchOn(data: any = {}) {}

    onSwitchOn(data?: any) {}

    switchOff() {}
}

export default TBaseController;
