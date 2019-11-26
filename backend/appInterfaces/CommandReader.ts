import { Command, CommandNames, CommandParams } from "./Command";
import { Observable } from 'rxjs';

export interface CommandReader {
    commands: Observable<Command>
    parse(msg: string): { name: CommandNames | undefined, params: CommandParams };
    attachCommandsListener(): void;
}