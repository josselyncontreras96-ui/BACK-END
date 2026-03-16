import { Router } from "express";
import { createCategoryType } from "../controllers/categoryType.controller.js";

const router = Router();

router.post("/category-Type", createCategoryType);

export default router;

