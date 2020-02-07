import { connect } from 'mongoose';

const options = {
    useNewUrlParser: true,
};

export function mongoConnect() {
    return connect('mongodb://localhost:27017/AuxBot', options)
        .catch(error => {
            console.log(`Error occured while connecting to mongo - ${error}`);
            return error;
        });
}