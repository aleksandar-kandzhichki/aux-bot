import { register } from "./commandRouting/commandRouting";
import { mongoConnect } from "./dbConnection";
const express = require('express');
//import * as express from 'express';

const app = express();

app.listen(3000, () => console.log("Listening on port 3000!"))
mongoConnect();
register();