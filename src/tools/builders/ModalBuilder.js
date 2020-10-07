import Modals from '../../consts/modals.js';
import MiniModal from '../../components/MiniModal/MiniModal.js';

class ModalBuilder {
    constructor() {
        this.app = document.querySelector('.application');
    }

    build(modalStatus) {
        if (modalStatus === Modals.authMini) {
            return this.buildAuthModal();
        }

        return this.buildUnauthModal();
    }

    buildAuthModal() {
        return new MiniModal({
            parent: this.app,
            context: {
                buttons: [
                    {
                        title: 'Профиль',
                        event: 'pathChanged',
                        path: '/profile',
                        modalStatus: '',
                    },
                    {
                        title: 'Выйти',
                        event: 'logoutUser',
                        path: '',
                        modalStatus: '',
                    },
                ],
            },
        });
    }

    buildUnauthModal() {
        return new MiniModal({
            parent: this.app,
            context: {
                buttons: [
                    {
                        title: 'Вход',
                        event: 'revealPopup',
                        path: '',
                        modalStatus: Modals.signin,
                    },
                    {
                        title: 'Регистрация',
                        event: 'revealPopup',
                        path: '',
                        modalStatus: Modals.signup,
                    },
                ],
            },
        });
    }
}

export default new ModalBuilder();
