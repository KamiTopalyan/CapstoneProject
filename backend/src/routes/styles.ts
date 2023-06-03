import express from "express";
import * as StyleController from "../controllers/style";

const router = express.Router();

router.get("/", StyleController.getStyles);
router.patch("/:styleId", StyleController.updateStyle);

export default router;