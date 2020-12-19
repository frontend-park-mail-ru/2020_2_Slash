import Component from '../Component';
import Context from '../../tools/Context';
import template from './PaymentForm.hbs';

class PaymentForm extends Component {
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        this.context.userId = localStorage.getItem('userId');
    }
}

export default PaymentForm;
