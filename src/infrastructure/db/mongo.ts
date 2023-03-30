import {connect} from 'mongoose';

require('dotenv').config();

const {
    MONGO_URL,
    MONGO_DB,
    MONGO_USERNAME,
    MONGO_PASSWORD,
} = process.env;

const dbInit = async () => {
    await connect(`${MONGO_URL}`, {
        dbName: MONGO_DB,
        ssl: false,
        auth: {
            username: MONGO_USERNAME,
            password: MONGO_PASSWORD,
        },
    });
};

export default dbInit;
