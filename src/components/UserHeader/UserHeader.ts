import Component from '../Component';
import Context from '../../tools/Context';
import template from './UserHeader.hbs';

/**
 * @class
 * Компонента профиля в хэдере (аватар + выпадающее меню)
 */
class UserHeader extends Component {
    /**
     * Создает экземпляр UserHeaderHeader
     *
     * @constructor
     * @this  {UserHeader}
     * @param context
     * @param parent
     */
    constructor(context?: Context, parent?: any) {
        super(context, parent);
        this.template = template;
    }
}

export default UserHeader;
