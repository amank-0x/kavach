import { Router } from "express";
import userRouter from "./user.route.js";
import reportRouter from "./report.route.js";

const indexRouter: Router = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/report", reportRouter);


export default indexRouter;
