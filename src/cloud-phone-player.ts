import * as SocketIO from "socket.io-client";

export default class CloudPhonePlayer {
    private socket: SocketIO.Socket;
    constructor() {
        console.log('cloud phone player init');
        this.socket = new SocketIO.Manager().socket('https://server-domain.com');
    }

    play() {
        this.socket.connect();
        console.log('test====');
    }

    destroy() {
        console.log('cloud phone player destroy');
    }
}