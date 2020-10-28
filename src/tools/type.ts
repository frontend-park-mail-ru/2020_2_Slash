interface CustomObject {
    [key: string] : ((param: any) => void)[];
}

interface InputsDataType {
    id: string,
    type: string,
    label: string,
    value?: string,
}

interface ButtonDataType {
    type: string,
    text: string,
    formType: string,
    eventType: string,
}

interface HelperDataType {
    text: string,
    modal: string,
    modalText: string,
}

export {
    CustomObject,
    InputsDataType,
    ButtonDataType,
    HelperDataType,
};
