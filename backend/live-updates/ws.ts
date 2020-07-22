import { IncomingMessage } from 'http';
import { Subject } from 'rxjs';
import WebSocket, { Server } from 'ws';
import config from '../config';

export const wss = new Server({
    port: config.wsPort,
    perMessageDeflate: {
        zlibDeflateOptions: {
            // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed.
    }
});

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