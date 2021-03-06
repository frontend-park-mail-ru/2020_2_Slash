import Component from '../Component';
import Context from '../../tools/Context';
import template from './Input.hbs';

/**
 * @class
 * Компонента инпута
 */
class Input extends Component {
    /**
     * Создает экземпляр Input
     *
     * @constructor
     * @this  {Input}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default Input;
