import Component from '../Component';
import Context from '../../tools/Context';
import template from './Form.hbs';

/**
 * @class
 * Компонента формы
 */
class Form extends Component {
    /**
     * Создает экземпляр Form
     *
     * @constructor
     * @this  {Form}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default Form;
