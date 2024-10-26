import { Router } from "express";
import userController from "../../controllers/user.controller.js";

const router = Router();



router.post("/", async (req, res) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});




router.post("/login", async (req, res) => {
  try {
    await userController.loginUser(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/", async (req, res) => {
  try {
    await userController.getAllUsers(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await userController.getUserById(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await userController.updateUser(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await userController.deleteUser(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile/:uid", async (req, res, next) => {
  try {
    const user = await UsersManager.readOne(req.params.uid);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.render("users/profile", { user });
  } catch (error) {
    next(error);
  }
});





export default router;
