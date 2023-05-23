import express from "express";
import * as passwordController from "../controllers/password";

const router = express.Router();

router.get("/", passwordController.getPasswords);

router.get("/:passwordId", passwordController.getPassword);

router.post("/", passwordController.createPassword);

router.patch("/:passwordId", passwordController.updatePassword);

router.delete("/:passwordId", passwordController.deletePassword);

export default router;