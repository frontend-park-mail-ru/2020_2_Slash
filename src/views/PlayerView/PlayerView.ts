import template from './PlayerView.hbs'
import TBaseView from '../TBaseView';
import CustomObject from '../../customInterfaces/customObject'

class PlayerView extends TBaseView {
    constructor(title: string = 'Flicks box', context: object = {}) {
        super(title, null, context);
        this.template = template;
    }

    show() {

        super.show();
    }
}

export default PlayerView;
