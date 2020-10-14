import BaseComponent from '../BaseComponent.js';
import template from './UserInfoBlock.hbs';

/**
 * @class
 * Компонента инфо пользователя для страницы профиля - ник, почта, автарка
 */
class UserInfoBlock extends BaseComponent {
    /**
     * Создает экземпляр UserInfoBlock
     *
     * @constructor
     * @param {{parent: Object, context: Object}} - Родительский элемент компоненты, данные для этого класса.
     * @this  {UserInfoBlock}
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = template;
    }
}

export default UserInfoBlock;
