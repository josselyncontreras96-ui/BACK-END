import { Router } from "express";

const router = Router();

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
} from "../controllers/categories.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/", getCategories);

router.get("/:id/products", getCategoryProducts); // primero específica
router.get("/:id", getCategoryById);              // después genérica

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;