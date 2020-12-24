import Component from '../Component';
import Context from '../../tools/Context';
import template from './SubscriptionForm.hbs';
import PaymentForm from '../PaymentForm/PaymentForm';

class SubscriptionForm extends Component {
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }

    render(): any {
        this.context.PaymentForm = new PaymentForm({}).render();
        return super.render();
    }
}

export default SubscriptionForm;
