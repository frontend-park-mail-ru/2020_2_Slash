const users = {
    'catherin': {
        'email': 'catherin@slash.com',
        'avatar': 'img/avatar.svg',
    },
};

class UserModel {
    getUserInfo(name) {
        return users[name];
    }
}

export default new UserModel();
