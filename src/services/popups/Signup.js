import Button from '../../components/Button/Button.js';
import Input from '../../components/Input/Input.js';

class Signup {

    button = new Button({
        context: {
            type: 'submit',
            text: 'Зарегистрироваться',
        },
    });

    inputsData = [
        {
            id: 'login',
            type: 'text',
            label: 'Логин',
        },
        {
            id: 'email',
            type: 'email',
            label: 'E-mail',
        },
        {
            id: 'password',
            type: 'password',
            label: 'Пароль',
        },
        {
            id: 'repeat_password',
            type: 'password',
            label: 'Повторите пароль',
        },
    ];

    inputs = Array.from(this.inputsData, (input) => new Input({context: input}).render());

    helper = {
        text: 'Уже зарегистрированы?',
        link: '#',
        linkText: 'Войти',
    };
}

export default new Signup();