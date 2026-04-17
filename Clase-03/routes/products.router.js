import { Router } from "express";

const router = Router();

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getProductsByCategoryId
  
} from "../controllers/products.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

// /product/search?name=ap
router.get("/search", searchProduct);
router.post("/", authMiddleware, createProduct);
router.get("/", getProducts);
router.get("/category/:categoryId", getProductsByCategoryId)
router.get("/:id", getProductById);
router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);




export default router;