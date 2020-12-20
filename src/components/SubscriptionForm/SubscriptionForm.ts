import Component from '../Component';
import Context from '../../tools/Context';
import template from './SubscriptionForm.hbs';

class SubscriptionForm extends Component {
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default SubscriptionForm;
