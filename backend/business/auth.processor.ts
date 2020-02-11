import auth from "../auth.json";

export interface IAuthProcessor {
    validateLogin(password: string): { token: string };
}

export class AuthProcessor implements IAuthProcessor {
    constructor() { }

    validateLogin(password: string) {
        if (password != auth.password) throw new Error("Invalid credentials!");
        return { token: auth.auth_token };
    }

}

const defaultAuthProcessor = new AuthProcessor();
export default defaultAuthProcessor; 