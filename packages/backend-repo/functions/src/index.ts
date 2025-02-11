import * as functions from "firebase-functions";

import { app } from "../../src/core/app";

exports.api = functions.https.onRequest(app);
