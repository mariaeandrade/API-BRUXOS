import express from "express";
import { getAllBruxos, getBruxoById, creatBruxo,updateBruxo, deleteBruxo} from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxoById);
router.post("/", creatBruxo);
router.put("/:id", updateBruxo);
router.delete("/:id", deleteBruxo);

export default router;