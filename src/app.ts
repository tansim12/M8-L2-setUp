import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./Error-Handle/globalErrorHandle";
import normalMiddleware from "./middleware/normalMiddleware";

const app: Application = express();
normalMiddleware(app);

app.get("/", (req: Request, res: Response) => {
  const a = 55;
  // res.send("Level-2 setup ");
  res.send(a);
});

app.all("*", (req: Request, res: Response, next) => {
  const error = new Error(`Can't find ${req.url} on the server`);
  next(error);
});

// global error handle
app.use(globalErrorHandler);

export default app;
