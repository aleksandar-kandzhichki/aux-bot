import { register } from "./commandRouting/commandRouting";
import { mongoConnect } from "./dbConnection";
import commandInfoRouter from "./routing/command-info.routes";
import commandRouter from "./routing/command.routes";
import urlInfoRouter from "./routing/url-info.routes";
import userRoutes from "./routing/user.routes";
import scheduledMessageRouter from "./routing/scheduled-messages.routes";
import * as bodyParser from 'body-parser';
import * as express from 'express';
import config from "./config";
import { openWs } from './live-updates/ws';
import * as http from 'http';

mongoConnect();

const port = config.appPort;

const app = express.default();
app.use(bodyParser.json());
app.use(commandInfoRouter);
app.use(commandRouter)
app.use(scheduledMessageRouter);
app.use(urlInfoRouter);
app.use(userRoutes);

// app.listen(port, () => console.log(`Listening on port ${port}!`))
var server = http.createServer(app);

openWs(server);
server.listen(port);
register();