import Component from '../Component';
import Context from '../../tools/Context';
import template from './Player.hbs';

/**
 * @class
 * Компонента плеера
 */
class Player extends Component {
    /**
     * Создает экземпляр Player
     *
     * @constructor
     * @this  {Player}
     * @param context
     * @param parent
     */

    constructor(context: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default Player;
