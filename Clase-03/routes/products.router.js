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


// /product/search?name=ap
router.get("/search", searchProduct);

router.get("/", getProducts);
router.get("/:id", authMiddleware, getProductById);
router.post("/", authMiddleware, createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/category/:categoryId", getProductsByCategoryId)


export default router;