import express from "express";
import * as userController from "../controllers/userController.js";
const router = express.Router();
router.post("/sign-up", userController.createUser);
router.get("/get-user-detail", userController.getUserDetail);
router.get("/get-all-users", userController.getAllUsers);
router.put("/update-user", userController.updateUser);
router.delete("/delete-user-by-id", userController.deleteUserById);
export default router;
