import { Command } from "./Command";
import { Observable } from 'rxjs';

export interface CommandReader {
    commands: Observable<Command>
    parse(msg: string): Command;
    attachCommandsListener(): void;
}