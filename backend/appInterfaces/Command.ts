export class Command {
    issuer: any;
    name: CommandNames;
    params: CommandParams;

    constructor(other: Command) {
        this.issuer = other.issuer;
        this.name = other.name;
        this.params = other.params;
    }

    static Command(issuer: any, name: any, params: CommandParams) {
        return new Command({ issuer, name, params })
    }
}

export enum CommandNames {
    summary = "summary"
}
export interface CommandParams {
    [param: string]: string;
}