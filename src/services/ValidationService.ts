import {Errors, Error} from '../consts/errors';

interface ResultType {
    isValid: boolean,
    error: string,
}

/**
 * @class
 * Класс, отвечающий за валидацию форм
 */
class ValidationService {
    private readonly setError: (form: HTMLFormElement, input: any, validationResult: ResultType) => void;
    private readonly clearErrors: (inputs: HTMLInputElement[], errors: Element[]) => void;
    /**
     * Создает экземпляр ValidationService
     *
     * @constructor
     * @this  {ValidationService}
     */

    constructor() {
        this.setError = (form, input, validationResult: ResultType) => {
            input.classList.add('input-block__input_invalid');

            const error = form.getElementsByClassName('error')[input.name];

            error.innerHTML = validationResult.error || '';
        };

        this.clearErrors = (inputs: HTMLInputElement[], errors: Element[]) => {
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].classList.remove('input-block__input_invalid');
                errors[i].innerHTML = '';
            }
        };
    }

    /**
     * @function
     * Проверяет форму авторизации
     * @return  {boolean} isValidForm
     * @param {Node} form - Форма для валидации
     * @param {string} error - Пришедшая с сервера ошибка валидации
     */
    ValidateLoginForm(form: HTMLFormElement, error?: Error) {
        const inputs: HTMLInputElement[] = Array.from(form.getElementsByTagName('input'));
        const errors: Element[] = Array.from(form.getElementsByClassName('error'));

        const [emailInput, passwordInput] = inputs;

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult: ResultType = this.isValidEmail(emailInput, error);
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
     * @return {{data: {password: *, nickname: *, email: *, repeatedPassword: *}, isValid: boolean}} isValidForm
     * @param {Node} form - Форма для валидации
     * @param {string} error - Пришедшая с сервера ошибка валидации
     */
    ValidateSignupForm(form: HTMLFormElement, error?: Error) {
        const inputs: HTMLInputElement[] = Array.from(form.getElementsByTagName('input'));
        const errors: Element[] = Array.from(form.getElementsByClassName('error'));

        const [nicknameInput, emailInput, passwordInput, repeatPasswordInput] = inputs;

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult: ResultType = this.isValidEmail(emailInput, error);
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
                repeatedPassword: repeatPasswordInput.value,
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
    ValidateProfileInfoForm(form: HTMLFormElement, error: Error) {
        const inputs: HTMLInputElement[] = Array.from(form.getElementsByTagName('input'));
        const errors: Element[] = Array.from(form.getElementsByClassName('error'));

        const [nicknameInput, emailInput] = inputs;

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        const validationResult: ResultType = this.isValidEmail(emailInput, error);
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
     * @param error
     */
    ValidateProfileSecurityForm(form: HTMLFormElement, error: Error) {
        const inputs: HTMLInputElement[] = Array.from(form.getElementsByTagName('input'));
        const errors: Element[] = Array.from(form.getElementsByClassName('error'));

        const [oldPasswordInput, newPasswordInput, repeatedPasswordInput] = inputs;

        this.clearErrors(inputs, errors);

        let isValidForm = true;

        let validationResult = this.isValidPassword(newPasswordInput.value, error);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, newPasswordInput, validationResult);
        }

        validationResult = this.equalPasswords(newPasswordInput.value, repeatedPasswordInput.value);
        if (!validationResult.isValid) {
            isValidForm = false;
            this.setError(form, repeatedPasswordInput, validationResult);
        }

        return {
            isValid: isValidForm,
            data: {
                oldPassword: oldPasswordInput.value,
                newPassword: newPasswordInput.value,
                repeatPassword: repeatedPasswordInput.value,
            },
        };
    }

    /**
     * @function
     * Проверяет логин
     * @return  {Object} result
     * @param {string} nickname - Логин
     * @param {Object} data - Данные
     */
    isValidNickname(nickname: string, data: any = null) {
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
    isValidEmail(email: HTMLInputElement, error: Error) {
        const result = {
            isValid: true,
            error: '',
        };

        if (!email.validity.valid) {
            result.isValid = false;
            result.error = 'Неправильный формат E-mail';
        }

        if (!email.value) {
            result.isValid = false;
            result.error = 'Введите E-mail';
        }

        if (error && (error.code === Errors.CodeEmailDoesNotExist ||
            error.code === Errors.CodeUserDoesNotExist ||
            error.code === Errors.CodeEmailAlreadyExists)) {
            result.isValid = false;
            result.error = error.user_message;
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
    isTruePassword(password: string, error: Error) {
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
    isValidPassword(password: string, error: Error) {
        const result = {
            isValid: true,
            error: '',
        };

        if (password.length < 6) {
            result.isValid = false;
            result.error = 'Пароль должен содержать не менее 6 символов';
        }

        if (error && error.code === Errors.CodeWrongPassword) {
            result.isValid = false;
            result.error = error.user_message;
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
    equalPasswords(password: string, repeated: string) {
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
