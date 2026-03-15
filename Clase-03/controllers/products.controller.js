import { validateStock, validatePrice } from "../utils/validators.js";

import Product from "../models/Product.js";


const products = [
  { id: 1, name: "Laptop", price: 1200, stock: 10 },
  { id: 2, name: "Mouse", price: 20, stock: 50 },
];



/*export const getProducts = (req, res) => {
  res.json(products);
};*/

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(400).json({ error: "Invalid id" });
  }
};

export const createProduct = async (req, res) => {
try {

   /* if (!validateStock(req.body.stock)) {
    // if (validateStock(req.body.stock) == false) {
    return res.status(422).json({ error: "Invalid stock" });
  }

  if (!validatePrice(req.body.price)) {
    return res.status(422).json({ error: "Invalid price" });
  }*/
  //const data = {
  //  name: req.body.name,
  //  price: Number(req.body.price),
  //  stock: Number(req.body.stock),
 // };
   const product = new Product(req.body);
  await product.save();
 res.status(201).json(product);

} catch (error) {
 // console.log(error.errors);

const errors = {};

for (const property in error.errors){
 // console.log(property, error.errors[property].message);
 errors[property] = error.errors[property].message
}
//console.log(errors);

if (error.name == "ValidationError"){
  return res.status(422).json({ error: errors });
}

  res.status(500).json({ error: "error interno"})
}
};

/*export const updateProduct = (req, res) => {
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
}*/
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

  // if (!validateStock (req.body.stock)){

   //}

    const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!productUpdate) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(productUpdate);

  } catch (error) {
    if (error.name == "validationError") {
        return res.status(422).json({ error: error.errors });
    }

    if (error.name == "CastError") {
   return res.status(400).json({ error: "Invalid ID"});
    }
    res.status(500).json({ error: "Error Interno"});
  }
};


  /*export const deleteProduct = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN (id)) {
      return res.status(400).json({ error: " Invalid ID"});

    }
    const productIndex = products.findIndex((p) => p.id == id);
    res.send(productIndex);

    //if (productIndex < 0) {
    if (productIndex == -1) {
      return res.status(404).json({ error: "Product not found"});
    }
    product.splice(productIndex, 1)

    res.status(204).send()
  
  };*/

  export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const productDelete = await Product.findByIdAndDelete(id);
    
    res.status(204).send();
  };

  export const searchProduct = async (req, res) => {
   const { name } = req.query;
  
if (!name) {
  return res.status(422).json({ error: "Name is required" });
}
const products = await Product.find({
  name: { $regex: name, $options: "i" },
});
res.json(products);

  };



