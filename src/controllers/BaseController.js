class BaseController {
    constructor(view) {
        this.view = view;
    }

    switchOn(data = {}) {}

    onSwitchOn(data = {}) {}

    switchOff() {}
}

export default BaseController;
