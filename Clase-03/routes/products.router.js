import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getProductsByCategory
} from "../controllers/products.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// /products/search?name=ap
router.get("/search", searchProduct);

// Obtener productos por categoría
router.get("/category/:categoryId", getProductsByCategory);

// Obtener todos
router.get("/", getProducts);

// Obtener uno por id
router.get("/:id", getProductById);

// Crear (protegido)
router.post("/", authMiddleware, createProduct);

// Actualizar
router.put("/:id", authMiddleware, updateProduct);

// Eliminar
router.delete("/:id", authMiddleware, deleteProduct);

export default router;



