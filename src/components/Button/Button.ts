import Component from '../Component';
import Context from "../../tools/Context";
import template from './Button.hbs';

/**
 * @class
 * Компонента кнопки
 */
class Button extends Component {
    /**
     * Создает экземпляр Button
     *
     * @constructor
     * @this  {Button}
     * @param parent
     * @param context
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default Button;
