import BaseView from '../BaseView.js';
import Header from '../../components/Header/Header.js';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock.js';
import ProfileMenuBar from '../../components/ProfileMenuBar/ProfileMenuBar.js';
import Footer from '../../components/Footer/Footer.js';

class ProfileView extends BaseView {
    constructor(context = {}) {
        super({title: 'Flicks Box', template: null, context});
        this.template = Handlebars.templates['ProfileView.hbs'];
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

        const menuBar = new ProfileMenuBar();

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
