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

    // removeListener(pollId) 

    sendPollUpdate(pollId: string, data?: PollSummary) {
        const listeners = this.getListeners(pollId).sockets
        if (listeners.length == 0) return;

        if (!data) data = this.getListeners(pollId).lastUpdate;

        listeners.forEach(l => l.send(JSON.stringify({ type: "watch-update", pollId, data })))
    }

    getListeners(pollId: string) {
        return this.data[pollId] || { lastUpdate: {}, sockets: [] };
    }

    addReactionToPoll(pollId: string, reaction: any) {
        this.getListeners(pollId).lastUpdate[reaction] = (this.getListeners(pollId).lastUpdate[reaction] || 0) + 1;

        this.sendPollUpdate(pollId);
    }

    removeReactionFromPoll(pollId: string, reaction: any) {
        this.getListeners(pollId).lastUpdate[reaction] = (this.getListeners(pollId).lastUpdate[reaction] || 1) - 1;
        if (this.getListeners(pollId).lastUpdate[reaction] == 0) delete this.getListeners(pollId).lastUpdate[reaction];

        this.sendPollUpdate(pollId);
    }
}

export const pollListeners = new PollListeners();

clientMessage.pipe(filter(({ data }) => {
    return (data.type == "watch" && !!data.pollId)
})).subscribe(({ data, socket }) => {
    pollListeners.addListener(data.pollId!, socket);
    SocketMessage.PollUpdate(data.pollId!, pollListeners.getListeners(data.pollId!).lastUpdate).sendToSocket(socket);
})