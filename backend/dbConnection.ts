import { connect } from 'mongoose';

const options = {
    useNewUrlParser: true,
};
const dbPort = 3327;

export function mongoConnect() {
    return connect(`mongodb://dev.auxcode.com:${dbPort}/AuxBot`, options)
        .catch(error => {
            console.log(`Error occured while connecting to mongo - ${error}`);
            return error;
        });
}