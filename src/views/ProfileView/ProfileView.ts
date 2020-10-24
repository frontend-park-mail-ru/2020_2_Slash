import View from '../View';
import Context from '../../tools/Context';
import Header from '../../components/Header/Header';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock';
import ProfileMenuBar from '../../components/ProfileMenuBar/ProfileMenuBar';
import Footer from '../../components/Footer/Footer';
import PInfoFormBuilder from '../../tools/builders/PInfoFormBuilder.js';
import PSecurityFormBuilder from '../../tools/builders/PSecurityFormBuilder.js';
import template from './ProfileView.hbs';

class ProfileView extends View {
    constructor(context = {}) {
        super('Flicks Box', context);
        this.template = template;
    }

    show() {
        const {authorized, avatar, nickname, email} = this.context;

        const header = new Header({
                authorized: authorized,
                avatar: avatar,
            });

        const usrInfoBlock = new UserInfoBlock({
                avatar: avatar,
                nickname: nickname,
                email: email,
            });

        const menuBar = new ProfileMenuBar({
                    InfoForm: PInfoFormBuilder.set([
                        {
                            id: 'nickname',
                            value: nickname,
                        },
                        {
                            id: 'email',
                            value: email,
                        }]).getForm().render(),
                    SecurityForm: PSecurityFormBuilder.getForm().render(),
                });

        const footer = new Footer();

        const data: Context = {
            UserInfoBlock: usrInfoBlock.render(),
            ProfileMenuBar: menuBar.render(),
        };

        this.insertIntoContext(data);

        super.show(this.template(data));
    }
}

export default ProfileView;
