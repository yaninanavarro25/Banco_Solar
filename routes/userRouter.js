import express from "express";
import { home, addUser, getUsers, editUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", home);

router.post("/usuario", addUser);

router.get("/usuarios", getUsers);

router.put("/usuario", editUser);

router.delete("/usuario", deleteUser)



export default router;