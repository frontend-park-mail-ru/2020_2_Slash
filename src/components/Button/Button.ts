import TBaseComponent from '../TBaseComponent';
import Context from "../../tools/Context";
import template from './Button.hbs';

/**
 * @class
 * Компонента кнопки
 */
class Button extends TBaseComponent {
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
