import { register } from "./commandRouting/commandRouting";
import { mongoConnect } from "./dbConnection";
import commandInfoRouter from "./routing/command-info.routes";
import urlInfoRouter from "./routing/url-info.routes";
import scheduledMessageRouter from "./routing/scheduled-messages.routes";
import * as bodyParser from 'body-parser';
const express = require('express');

mongoConnect();

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(commandInfoRouter);
app.use(scheduledMessageRouter);
app.use(urlInfoRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`))
register();