import { IncomingMessage, Server as HttpServer } from 'http';
import { Subject } from 'rxjs';
import WebSocket, { Server } from 'ws';

export const openWs = (server: HttpServer) => {
    wss = new Server({ server, perMessageDeflate: false });

    wss.on('connection', (socket, request) => {
        clientConnection.next({ socket, request });
        socket.on('message', (data) => {
            const parsedData = new SocketMessage(JSON.parse(data.toString()));
            clientMessage.next({ socket, data: parsedData })
        })
    })

    wss.on('close', (data: any) => {
        clientDisconnect.next({ data })
    })
}
export let wss: Server;

export const clientMessage = new Subject<{ data: SocketMessage, socket: WebSocket }>();
export const clientConnection = new Subject<{ socket: WebSocket, request: IncomingMessage }>();
export const clientDisconnect = new Subject<{ data: any }>();

export class SocketMessage {
    type: "watch" | "watch-update" | undefined;
    data: any;
    pollId?: string;

    constructor(other: SocketMessage) {
        this.type = other.type;
        this.data = other.data;
        this.pollId = other.pollId;
    }

    static PollUpdate(pollId: string, data: any) {
        return new SocketMessage({ type: "watch-update", data, pollId })
    }
}
