import express from "express";
import { getAllBruxos, getBruxoById, creatBruxo, deleteBruxo} from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxoById);
router.post("/", creatBruxo);
router.delete("/:id", deleteBruxo);

export default router;