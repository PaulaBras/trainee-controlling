import express from "express";
import { initializeApplication } from "./core/StartupRoutine";
import { Config } from "./core/Config";
import Logger, { LogLevels } from "./utility/Logger";
import { apiRouter } from "./routes/ApiRouter";
import bodyParser from "body-parser";

const application = express();

initializeApplication()
    .then(() => {
        application.listen(Config.APP_PORT, () => {
            Logger.log(LogLevels.LOG_SUCCESS, `Server is running on http://localhost:${Config.APP_PORT}`, true);
        });
        application.use(bodyParser.json());

        application.use(apiRouter);
    })
    .catch(() => {
        Logger.log(LogLevels.LOG_ERROR, "\n\nFatal Error detected. Application will now shutdown!\n\n");
        process.exit(-1);
    });
