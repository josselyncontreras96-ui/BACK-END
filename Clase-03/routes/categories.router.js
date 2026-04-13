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
router.get("/:id", authMiddleware, getCategoryById); // obliga a que el usuario este autenticado 
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id/products", getCategoryProducts);

export default router;