import BaseComponent from '../BaseComponent.js';

/**
 * @class Компонента инфо пользователя для страницы профиля - ник, почта, автарка
 */
class UserInfoBlock extends BaseComponent {
    /**
     * Создает экземпляр UserInfoBlock
     *
     * @constructor
     * @this  {UserInfoBlock}
     * @param {Object} parent - Родительский элемент элемента
     * @param {Object} context - Необходимые данные для этого класса, его hbs
     */
    constructor({parent = null, context = {}} = {}) {
        super({parent: parent, context: context});
        this.template = Handlebars.templates['UserInfoBlock.hbs'];
    }

    /**
     * Возвращает отрисованный в HTML компонент
     * @return {*|string}
     */
    render() {
        return this.template(this.context);
    }
}

export default UserInfoBlock;
