//TODO: add usage to the response
import express from "express";

import membershipRoutes from "./routes/membershipRoutes";
import userCrudRoutes from "./routes/UserCrudRoutes";
import authenticationRoutes from "./routes/AuthenticationRoutes";
import adminRoutes from "./routes/AdminRoutes";
import NotFoundHandler from "./middleware/NotFoundHandler";
import errorHandler from "./middleware/errorHandler";
import config from "./config/config";
import logger from "./config/logging";
import mongoConnect from "./config/mongoConnect";
import morgan from "./config/morgan";
import checkRole from "./middleware/checkRole";
import checkToken from "./middleware/checkToken";
import cors from "cors";

const app: express.Application = express();

//connect to database
mongoConnect();

//send formatted JSON
app.set("json spaces", 2);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan);
app.use(cors());

//routes middleware
app.use("/user", userCrudRoutes);
app.use("/auth", authenticationRoutes);
app.use("/membership", membershipRoutes);
app.use("/admin", checkToken, checkRole(["ADMIN"]), adminRoutes);

//404 and errorhandler
app.use(errorHandler);
app.use(NotFoundHandler);

app.listen(config.server.port, () => {
  console.clear();
  logger.info(`Listening on port ${config.server.port}`);
});
