import express from "express";
import { getExampleHeaders } from "../controllers/functionsExapmpleHeaders.js";

const router = express.Router();

router.route("/")
  .get(getExampleHeaders)

export default router;