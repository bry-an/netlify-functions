import express from "express";

import serverless from "serverless-http"
const app = express()
import bodyParser from "body-parser"
const router = express.Router()

import { getRecommendation } from './basic.js';

app.use(bodyParser.json())
app.use("/.netlify/functions/winston", router) // path must route to lambda
app.use("/", router)

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" })
  res.write("<h1>Up and running</h1>")
  res.end()
})

router.get("/basic", (req, res) => {
    const { dealer = '', player = '', hard = true } = req.query;
    const dealerVal = parseInt(dealer);
    const playerVal = parseInt(player);
    const hardBool = hard === "true";

    const recommendation = getRecommendation(playerVal, dealerVal, hardBool) || {};
    return res.json({
        recommendation,
    });
})

export default app;

export const handler = serverless(app);
