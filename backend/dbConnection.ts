import { connect } from 'mongoose';

const options = {
    useNewUrlParser: true,
};
const dbPort = 777;

export function mongoConnect() {
    return connect(`mongodb://dev.auxcode.com:${dbPort}/AuxBot`, options)
        .catch(error => {
            console.log(`Error occured while connecting to mongo - ${error}`);
            return error;
        });
}