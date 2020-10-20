import TBaseComponent from '../TBaseComponent';
import Context from "../../tools/Context";
import template from './Header.hbs';

/**
 * @class
 * Компонента хэдера
 */
class Header extends TBaseComponent {
    /**
     * Создает экземпляр Header
     *
     * @constructor
     * @this  {Header}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default Header;
