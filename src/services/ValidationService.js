import {Errors} from '../consts/errors.ts';

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

        const {email: emailInput, password: passwordInput} = inputs;

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult = this.isValidEmail(emailInput, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, emailInput, validationResult);
        }

        validationResult = this.isValidPassword(passwordInput.value, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, passwordInput, validationResult);
        }

        return {
            isValid: isValidForm,
            data: {
                email: emailInput.value,
                password: passwordInput.value,
            },
        };
    }

    /**
     * @function
     * Проверяет форму регистрации
     * @return {{data: {password: *, nickname: *, email: *, repeated_password: *}, isValid: boolean}} isValidForm
     * @param {Node} form - Форма для валидации
     * @param {string} error - Пришедшая с сервера ошибка валидации
     */
    ValidateSignupForm(form, error = '') {
        const inputs = form.getElementsByTagName('input');
        const errors = form.getElementsByClassName('error');

        const {
            nickname: nicknameInput,
            email: emailInput,
            password: passwordInput,
            repeat_password: repeatPasswordInput
        } = inputs

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult = this.isValidEmail(emailInput, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, emailInput, validationResult);
        }

        validationResult = this.isValidPassword(passwordInput.value, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, passwordInput, validationResult);
        }

        validationResult = this.equalPasswords(passwordInput.value, repeatPasswordInput.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, repeatPasswordInput, validationResult);
        }

        return {
            isValid: isValidForm,
            data: {
                nickname: nicknameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                repeated_password: repeatPasswordInput.value,
            },
        };
    }

    /**
     * @function
     * Проверяет форму информации аккаунта
     * @return  {{data: {nickname: *, email: *}, isValid: boolean}} isValidForm
     * @param {Node} form - Форма для валидации
     * @param {string} error - Пришедшая с сервера ошибка валидации
     */
    ValidateProfileInfoForm(form, error = '') {
        const inputs = form.getElementsByTagName('input');
        const errors = form.getElementsByClassName('error');

        const {nickname: nicknameInput, email: emailInput} = inputs

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        const validationResult = this.isValidEmail(emailInput, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, emailInput, validationResult);
        }

        return {
            isValid: isValidForm,
            data: {
                nickname: nicknameInput.value,
                email: emailInput.value,
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

        const {oldPassword: oldPasswordInput, newPassword: newPasswordInput, repeatedPassword: repeatedPasswordInput} = inputs

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult = this.isTruePassword(oldPasswordInput.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, oldPasswordInput, validationResult);
        }

        validationResult = this.isValidPassword(newPasswordInput.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, newPasswordInput, validationResult);
        }

        validationResult = this.equalPasswords(newPasswordInput.value, repeatedPasswordInput.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, repeatedPasswordInput, validationResult);
        }

        return isValidForm;
    }

    /**
     * @function
     * Проверяет логин
     * @return  {Object} result
     * @param {string} nickname - Логин
     * @param {Object} data - Данные
     */
    isValidNickname(nickname, data = null) {
        const result = {
            isValid: true,
            error: '',
        };

        if (!nickname) {
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
