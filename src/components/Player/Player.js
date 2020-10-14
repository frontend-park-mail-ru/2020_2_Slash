import BaseComponent from '../BaseComponent.js';
import template from './Player.hbs';

/**
 * @class
 * Компонента плеера
 */
class Player extends BaseComponent {
    /**
     * Создает экземпляр Player
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {Player}
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent, context});
        this.template = template;
    }
}

export default Player;
