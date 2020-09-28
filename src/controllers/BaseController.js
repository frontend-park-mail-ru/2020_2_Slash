class BaseController {
    constructor(view) {
        this.view = view;
    }

    switchOn(data = {}) {}

    onSwitchOn() {}

    switchOff() {}

    onSwitchOff() {}
}

export default BaseController;
