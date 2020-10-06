class ValidationService {
    constructor(form) {
        this.setError = (input, validationResult) => {
            input.classList.add('input-block__input_invalid');
            const error = form.getElementsByClassName('error')[input.name];
            error.innerHTML = validationResult.error || '';
        };

        this.clearErrors = (inputs, errors) => {
            Array.from(inputs).forEach((input, i) => {
                input.classList.remove('input-block__input_invalid');
                errors[i].innerHTML = '';
            });
        }
    }

    ValidateLoginForm(form, data) {
        this.setError = (input, validationResult) => {
            input.classList.add('input-block__input_invalid');
            const error = form.getElementsByClassName('error')[input.name];
            error.innerHTML = validationResult.error || '';
        };

        const inputs = form.getElementsByTagName('input');
        const errors = form.getElementsByClassName('error');

        const login = inputs['login'];
        const password = inputs['password'];

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult = this.isValidLogin(login.value, data);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(login, validationResult);
        }

        validationResult = this.isValidLogin(password.value, data);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(password, validationResult);
        }

        return isValidForm;
    }

    ValidateSignupForm(form) {
        const inputs = form.getElementsByTagName('input');
        const errors = form.getElementsByClassName('error');

        const login = inputs['login'];
        const email = inputs['email'];
        const password = inputs['password'];
        const repeatPassword = inputs['repeat_password'];

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult = this.isValidLogin(login.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(login, validationResult);
        }

        validationResult = this.isValidEmail(email);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(email, validationResult);
        }

        validationResult = this.isValidPassword(password.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(password, validationResult);
        }

        validationResult = this.equalPasswords(password.value, repeatPassword.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(repeatPassword, validationResult);
        }

        return isValidForm;
    }

    ValidateProfileInfoForm(form) {
        const inputs = form.getElementsByTagName('input');
        const errors = form.getElementsByClassName('error');

        const login = inputs['login'];
        const email = inputs['email'];

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult = this.isValidLogin(login.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(login, validationResult);
        }

        validationResult = this.isValidEmail(email);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(email, validationResult);
        }

        return isValidForm;
    }

    ValidateProfileSecurityForm(form) {
        const inputs = form.getElementsByTagName('input');
        const errors = form.getElementsByClassName('error');

        const oldPassword = inputs['oldPassword'];
        const newPassword = inputs['newPassword'];
        const repeatedPassword = inputs['repeatedPassword'];

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult = this.isTruePassword(oldPassword.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(oldPassword, validationResult);
        }

        validationResult = this.isValidPassword(newPassword.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(newPassword, validationResult);
        }

        validationResult = this.equalPasswords(newPassword.value, repeatedPassword.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(repeatedPassword, validationResult);
        }

        return isValidForm;
    }

    isValidLogin(login, data = null) {
        const result = {
            isValid: true,
            error: ''
        };

        if (!login) {
            result.isValid = false;
            result.error = 'Введите логин';
        }

        if (data) {
            result.isValid = !data.error;
            result.error = 'Логин не найден';
        }

        return result;
    }

    isValidEmail(email) {
        const result = {
            isValid: true,
            error: ''
        };

        // email is instance of HTMLInputElement
        if (!email.validity.valid) {
            result.isValid = false;
            result.error = 'Неправильный формат E-mail';
        }

        if (!email.value) {
            result.isValid = false;
            result.error = 'Введите E-mail';
        }

        return result;
    }

    isTruePassword(password, data = null) {
        const result = {
            isValid: true,
            error: ''
        };

        if (password === '') {
            result.isValid = false;
            result.error = 'Вы забыли ввести старый пароль';
        }

        if (data) {
            result.isValid = !data.error;
            result.error = 'Неверный пароль';
        }


        return result;
    }

    isValidPassword(password, data = null) {
        const result = {
            isValid: true,
            error: ''
        };

        if (password.length < 6) {
            result.isValid = false;
            result.error = 'Пароль должен содержать не менее 6 символов';
        }

        if (data) {
            result.isValid = !data.error;
            result.error = 'Неверный пароль';
        }


        return result;
    }

    equalPasswords(password, repeated) {
        const result = {
            isValid: true,
            error: ''
        };

        if (password !== repeated) {
            result.isValid = false;
            result.error = 'Пароли не совпадают';
        }

        return result;
    }
}

export default ValidationService;
