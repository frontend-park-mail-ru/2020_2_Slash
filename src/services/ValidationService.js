/**
 * @class
 * Класс, отвечающий за валидацию форм
 */
class ValidationService {
    /**
     * Создает экземпляр ValidationService
     *
     * @constructor
     * @this  {ValidationService}
     */
    constructor() {
        this.setError = (form, input, validationResult) => {
            input.classList.add('input-block__input_invalid');
            const error = form.getElementsByClassName('error')[input.name];
            error.innerHTML = validationResult.error || '';
        };

        this.clearErrors = (inputs, errors) => {
            Array.from(inputs).forEach((input, i) => {
                input.classList.remove('input-block__input_invalid');
                errors[i].innerHTML = '';
            });
        };
    }

    /**
     * @function
     * Проверяет форму авторизации
     * @return  {boolean} isValidForm
     * @param {Node} form - Форма для валидации
     * @param {string} error - Пришедшая с сервера ошибка валидации
     */
    ValidateLoginForm(form, error = '') {
        const inputs = form.getElementsByTagName('input');
        const errors = form.getElementsByClassName('error');

        const email = inputs['email'];
        const password = inputs['password'];

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult = this.isValidEmail(email, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, email, validationResult);
        }

        validationResult = this.isValidPassword(password.value, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, password, validationResult);
        }

        return {
            isValid: isValidForm,
            data: {
                email: email.value,
                password: password.value,
            },
        };
    }

    /**
     * @function
     * Проверяет форму регистрации
     * @return {boolean} isValidForm
     * @param {Node} form - Форма для валидации
     * @param {string} error - Пришедшая с сервера ошибка валидации
     */
    ValidateSignupForm(form, error = '') {
        const inputs = form.getElementsByTagName('input');
        const errors = form.getElementsByClassName('error');

        const login = inputs['login'];
        const email = inputs['email'];
        const password = inputs['password'];
        const repeatPassword = inputs['repeat_password'];

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult = this.isValidEmail(email, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, email, validationResult);
        }

        validationResult = this.isValidPassword(password.value, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, password, validationResult);
        }

        validationResult = this.equalPasswords(password.value, repeatPassword.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, repeatPassword, validationResult);
        }

        return {
            isValid: isValidForm,
            data: {
                login: login.value,
                email: email.value,
                password: password.value,
                repeatPassword: repeatPassword.value,
            },
        };
    }

    /**
     * @function
     * Проверяет форму информации аккаунта
     * @return  {boolean} isValidForm
     * @param {Node} form - Форма для валидации
     * @param {string} error - Пришедшая с сервера ошибка валидации
     */
    ValidateProfileInfoForm(form, error = '') {
        const inputs = form.getElementsByTagName('input');
        const errors = form.getElementsByClassName('error');

        const name = inputs['name'];
        const email = inputs['email'];

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        const validationResult = this.isValidEmail(email, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, email, validationResult);
        }

        return {
            isValid: isValidForm,
            data: {
                name: name.value,
                email: email.value,
            },
        };
    }

    /**
     * @function
     * Проверяет форму изменения пароля аккаунта
     * @return  {boolean} isValidForm
     * @param {Node} form - Форма для валидации
     */
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
            this.setError(form, oldPassword, validationResult);
        }

        validationResult = this.isValidPassword(newPassword.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, newPassword, validationResult);
        }

        validationResult = this.equalPasswords(newPassword.value, repeatedPassword.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, repeatedPassword, validationResult);
        }

        return isValidForm;
    }

    /**
     * @function
     * Проверяет логин
     * @return  {Object} result
     * @param {string} login - Логин
     * @param {Object} data - Данные
     */
    isValidLogin(login, data = null) {
        const result = {
            isValid: true,
            error: '',
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

    /**
     * @function
     * Проверяет почту
     * @return  {Object} result
     * @param {string} email - Логин
     * @param {string} error - Пришедшая с сервера ошибка валидации
     */
    isValidEmail(email, error = '') {
        const result = {
            isValid: true,
            error: '',
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

        if (error) {
            result.isValid = !(
                error === Errors.EmailAlreadyExists ||
                error === Errors.EmailDoesntExist ||
                error === Errors.EmailAlreadyExistsProfile);
            result.error = error === Errors.EmailAlreadyExists ? Errors.EmailAlreadyExists : '';
            result.error = error === Errors.EmailAlreadyExistsProfile ? Errors.EmailAlreadyExistsProfile : result.error;
            result.error = error === Errors.EmailDoesntExist ? Errors.EmailDoesntExist : result.error;
        }

        return result;
    }

    /**
     * @function
     * Проверяет пароль
     * @return  {Object} result
     * @param {string} password - Пароль уже зарегистрированного польщовтеля
     * @param {string} error - Пришедшая с сервера ошибка валидации
     */
    isTruePassword(password, error = '') {
        const result = {
            isValid: true,
            error: '',
        };

        if (password === '') {
            result.isValid = false;
            result.error = 'Вы забыли ввести старый пароль';
        }

        if (error) {
            result.isValid = !error;
            result.error = 'Неверный пароль';
        }


        return result;
    }

    /**
     * @function
     * Проверяет пароль
     * @return  {Object} result
     * @param {string} password - Пароль
     * @param {string} error - Пришедшая с сервера ошибка валидации
     */
    isValidPassword(password, error = '') {
        const result = {
            isValid: true,
            error: '',
        };

        if (password.length < 6) {
            result.isValid = false;
            result.error = 'Пароль должен содержать не менее 6 символов';
        }

        if (error) {
            result.isValid = !(error === Errors.WrongPassword || error === Errors.PasswordsDontMatch);
            result.error = error === Errors.WrongPassword ? Errors.WrongPassword : '';
            result.error = error === Errors.PasswordsDontMatch ? Errors.PasswordsDontMatch : result.error;
        }

        return result;
    }

    /**
     * @function
     * Проверяет пароль
     * @return  {Object} result
     * @param {string} password - Пароль
     * @param {string} repeated - Пароль для сравнения
     */
    equalPasswords(password, repeated) {
        const result = {
            isValid: true,
            error: '',
        };

        if (password !== repeated) {
            result.isValid = false;
            result.error = 'Пароли не совпадают';
        }

        return result;
    }
}

export default ValidationService;
