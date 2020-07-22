import { clientMessage, SocketMessage } from "./ws"
import { filter } from 'rxjs/operators';
import WebSocket from "ws";

type PollSummary = { [emote: string]: number }

class PollListeners {
    data: { [pollId: string]: { lastUpdate: PollSummary, sockets: WebSocket[] } | undefined } = {};

    addListener(pollId: string, socket: WebSocket) {
        if (!this.data[pollId]) this.data[pollId] = { lastUpdate: {}, sockets: [] };
        else this.data[pollId]!.sockets.push(socket);
    }

    sendPollUpdate(pollId: string, data: PollSummary) {
        const listeners = this.getListeners(pollId).sockets
        if (listeners.length == 0) return;

        listeners.forEach(l => l.send({ type: "watch-update", pollId, data }))
    }

    getListeners(pollId: string) {
        return this.data[pollId] || { lastUpdate: {}, sockets: [] };
    }
}

export const pollListeners = new PollListeners();

clientMessage.pipe(filter(({ data }) => {
    return (data.type == "watch" && !!data.pollId)
})).subscribe(({ data, socket }) => {
    pollListeners.addListener(data.pollId!, socket);
    socket.send(SocketMessage.PollUpdate(data.pollId!, pollListeners.getListeners(data.pollId!).lastUpdate));
})