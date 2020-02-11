import { register } from "./commandRouting/commandRouting";
import { mongoConnect } from "./dbConnection";
import commandInfoRouter from "./routing/command-info.routes";
import urlInfoRouter from "./routing/url-info.routes";
import userRoutes from "./routing/user.routes";
import scheduledMessageRouter from "./routing/scheduled-messages.routes";
import * as bodyParser from 'body-parser';
import * as express from 'express';

mongoConnect();

const port = 3000;

const app = express.default();
app.use(bodyParser.json());
app.use(commandInfoRouter);
app.use(scheduledMessageRouter);
app.use(urlInfoRouter);
app.use(userRoutes);

app.listen(port, () => console.log(`Listening on port ${port}!`))
register();