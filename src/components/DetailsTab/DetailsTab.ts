import Component from '../Component';
import Context from '../../tools/Context';
import template from './DetailsTab.hbs';
import {SERVER_HOST} from '../../consts/settings';
import {MOBILE_DEVICE_WIDTH} from "../../consts/other";

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

    render(): any {
        if (window.innerWidth < MOBILE_DEVICE_WIDTH) {
            if (this.context.description.length > 530) {
                this.context.description = this.context.short_description;
            }
        }
        return super.render();
    }
}

export default DetailsTab;
