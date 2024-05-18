import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
type App = ReturnType<typeof express>;
const normalMiddleware = (app:App) => {
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174"],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
};
export default normalMiddleware;
