import express, { Request, Response } from "express";
import globalErrorHandler from "./Error-Handle/globalErrorHandle";
import normalMiddleware from "./middleware/normalMiddleware";
type App = ReturnType<typeof express>;
const app:App = express();
normalMiddleware(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Level-2 setup ");
});

app.all("*", (req: Request, res: Response, next) => {
  const error = new Error(`Can't find ${req.url} on the server`);
  next(error);
});

app.use(globalErrorHandler);

export default app;
