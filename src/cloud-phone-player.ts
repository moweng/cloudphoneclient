import { Socket, io } from "socket.io-client";

export default class CloudPhonePlayer {
    private socket: Socket;
    constructor() {
        console.log('cloud phone player init');
        this.socket = io('https://server-domain.com');
    }

    play() {
        this.socket.connect();
        console.log('test====');
    }

    destroy() {
        console.log('cloud phone player destroy');
    }
}