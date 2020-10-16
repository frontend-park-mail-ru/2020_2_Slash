interface IController {
    switchOn(data: any): void

    onSwitchOn(data?: any): void

    switchOff(): void
}

export default IController;
