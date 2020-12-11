import Component from '../Component';
import Context from '../../tools/Context';
import template from './Preview.hbs';
import {SERVER_HOST} from '../../consts/settings';

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

        const content = this.context.preview;

        if (content.type === 'movie') {
            this.context.href = `/watch/${content.id}`;
        } else if (content.type === 'tvshow') {
            this.context.href = `/watch/${content.id}?season=1&episode=1`;
        }
        this.context.host = SERVER_HOST;
    }
}

export default Preview;
