export default function setTime(inputSeconds: number): string {
    let hours: any = Math.floor(inputSeconds / 3600);
    let minutes: any = Math.floor(inputSeconds / 60 - hours * 60);
    let seconds: any = Math.floor(inputSeconds - minutes * 60 - hours * 3600);

    if (minutes < 0) {
        minutes = -minutes;
    }

    if (seconds < 0) {
        seconds = -seconds;
    }

    if (hours < 1) {
        return `${toStr(minutes)}:${toStr(seconds)}`;
    }

    return `${toStr(hours)}:${toStr(minutes)}:${toStr(seconds)}`;
}

const toStr = (input: any) => {
    return input.toFixed(0).toString().padStart(2, '0');
}
