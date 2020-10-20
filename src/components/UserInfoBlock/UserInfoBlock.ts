import TBaseComponent from '../TBaseComponent';
import Context from "../../tools/Context";
import template from './UserInfoBlock.hbs';

/**
 * @class
 * Компонента инфо пользователя для страницы профиля - ник, почта, автарка
 */
class UserInfoBlock extends TBaseComponent {
    /**
     * Создает экземпляр UserInfoBlock
     *
     * @constructor
     * @this  {UserInfoBlock}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default UserInfoBlock;
