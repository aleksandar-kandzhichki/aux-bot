
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket'


const socket = webSocket('ws://localhost:3001')
export const pollUpdate = new Subject({})

export function watchPollUpdates(pollId) {
    socket.next({ type: "watch", pollId });
}
socket.subscribe((data) => {
    if (data.type == "watch-update") pollUpdate.next(data);
})