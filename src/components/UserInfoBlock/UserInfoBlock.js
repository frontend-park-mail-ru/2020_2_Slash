import BaseComponent from '../BaseComponent.js';

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
