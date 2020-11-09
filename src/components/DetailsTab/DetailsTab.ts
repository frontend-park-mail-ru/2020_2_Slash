import Component from '../Component';
import Context from '../../tools/Context';
import template from './DetailsTab.hbs';
import {SERVER_HOST} from '../../consts/settings';

/**
 * @class
 * Компонента страницы с подробной информацией о фильме/сериале
 */
class DetailsTab extends Component {
    /**
     * Создает экземпляр DetailsTab
     *
     * @constructor
     * @this  {DetailsTab}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;

        this.context.host = SERVER_HOST;
    }
}

export default DetailsTab;
