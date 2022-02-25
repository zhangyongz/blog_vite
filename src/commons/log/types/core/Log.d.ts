export default class Log {
    token: string;
    img: boolean;
    constructor(token: string, img?: boolean);
    track(event_name: string, params: any, callback: any): void;
    request(url: string, callback: any): void;
}
