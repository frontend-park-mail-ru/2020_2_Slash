import BaseView from '../BaseView.js';
import Header from '../../components/Header/Header.js';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock.js';
import ProfileMenuBar from '../../components/ProfileMenuBar/ProfileMenuBar.js';
import Footer from '../../components/Footer/Footer.js';
import PInfoFormBuilder from '../../tools/builders/PInfoFormBuilder.js';
import PSecurityFormBuilder from '../../tools/builders/PSecurityFormBuilder.js';
import template from './ProfileView.hbs';

class ProfileView extends BaseView {
    constructor(context = {}) {
        super({title: 'Flicks Box', template: null, context});
        this.template = template;
    }

    show() {
        const {authorized, avatar, nickname, email} = this.context;

        const header = new Header({
            context: {
                authorized: authorized,
                avatar: avatar,
            },
        });

        const usrInfoBlock = new UserInfoBlock({
            context: {
                avatar: avatar,
                nickname: nickname,
                email: email,
            },
        });

        const menuBar = new ProfileMenuBar(
            {
                context: {
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
                },
            },
        );

        const footer = new Footer();

        const data = {
            Header: header.render(),
            UserInfoBlock: usrInfoBlock.render(),
            ProfileMenuBar: menuBar.render(),
            Footer: footer.render(),
        };

        this.insertIntoContext(data);

        super.show();
    }
}

export default ProfileView;
