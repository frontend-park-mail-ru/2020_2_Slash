import Component from '../Component';
import Context from '../../tools/Context';
import template from './EpisodeCard.hbs';
import {SERVER_HOST} from '../../consts/settings';

/**
 * @class
 * Компонента элемента слайдера - фильм/сериал миниатюра
 */
class EpisodeCard extends Component {
    /**
     * Создает экземпляр SliderItem
     *
     * @constructor
     * @this  {Item}
     * @param context
     * @param parent
     */
    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }

    render(): any {
        this.context.host = SERVER_HOST;
        return super.render();
    }
}

export default EpisodeCard;
