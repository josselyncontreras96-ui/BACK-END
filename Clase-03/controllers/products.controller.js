import { validateStock, validatePrice } from "../utils/validators.js";

const products = [
  { id: 1, name: "Laptop", price: 1200, stock: 10 },
  { id: 2, name: "Mouse", price: 20, stock: 50 },
];

export const getProducts = (req, res) => {
  res.json(products);
};

export const getProductById = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const product = products.find((p) => p.id == id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
};

export const createProduct = (req, res) => {
  if (!validateStock(req.body.stock)) {
    // if (validateStock(req.body.stock) == false) {
    return res.status(422).json({ error: "Invalid stock" });
  }

  if (!validatePrice(req.body.price)) {
    return res.status(422).json({ error: "Invalid price" });
  }

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const product = products.find((p) => p.id == id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // console.log(product);
  // console.log(req.body);

  if (!validateStock(req.body.stock)) {
    return res.status(422).json({ error: "Invalid stock" });
  }

  if (!validatePrice(req.body.price)) {
    return res.status(422).json({ error: "Invalid price" });
  }

  const { name, price, stock } = req.body;

  // console.log(name, price, stock);

  product.name = name;
  product.price = Number(price);
  product.stock = Number(stock);

  // console.log(product);

  res.json(product);
};