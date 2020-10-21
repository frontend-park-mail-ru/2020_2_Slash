import Component from '../Component';
import Context from '../../tools/Context';
import template from './Preview.hbs';

/**
 * @class
 * Компонента фильма/сериала на главной странице
 */
class Preview extends Component {
    /**
     * Создает экземпляр Preview
     *
     * @constructor
     * @this  {Preview}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default Preview;
