import template from './MainView.hbs';
import BaseView from '../BaseView.js';

class MainView extends BaseView {
    constructor(context = {}) {
        super({template: template, context: context});
    }

    show() {
        super.show();
    }
}

export default MainView;
