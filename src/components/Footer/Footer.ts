import Component from '../Component';
import Context from '../../tools/Context';
import template from './Footer.hbs';

/**
 * @class
 * Компонента футера
 */
class Footer extends Component {
    /**
     * Создает экземпляр Footer
     *
     * @constructor
     * @this  {Footer}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default Footer;
