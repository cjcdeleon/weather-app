// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require('cors');

dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    console.log(`Express + TypeScript Server Carlos ${req.query.name}`)
    res.send({test:`Express + TypeScript Server Carlos ${req.query.name}`});
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});