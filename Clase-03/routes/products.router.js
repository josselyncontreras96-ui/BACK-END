import { Router } from "express";

const router = Router();

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/products.controller.js";

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);

router.put("/:id", updateProduct);

export default router;