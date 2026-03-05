import { Router } from "express";

const router = Router();

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  updateCategory,
} from "../controllers/categories.controller.js";

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);

export default router;