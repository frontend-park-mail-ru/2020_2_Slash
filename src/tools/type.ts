export default interface CustomObject {
    [key: string] : ((param: any) => void)[];
}
