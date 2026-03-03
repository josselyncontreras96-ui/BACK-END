
import express from 'express';

const app = express();

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" }
];

const categories = [
    { id: 1,
        name: "Electro",
        description: "Lorem ipsum"
    },
    { id: 2,
        name: "Bazar",
        description: "Lorem ipsum bazar"
    },
];
app.get('/products/:id', (req, res) => {
   //const product = products.find((p) => p.id == req.params.id);
   const id = parseInt(req.params.id); // Convertir el ID a número
   if (isNaN(id)) {
       return res.status(400).json({ message: "ID inválido" });
   }

   const product = products.find((p) => p.id === id);

   if (!product) {
       return res.status(404).json({ message: "Producto no encontrado" });
   }

   res.json(product); // Devuelve el producto encontrado como respuesta JSON
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/categories/:id', (req, res) => {
   const id = parseInt(req.params.id);

   if (isNaN(id)) {
       return res.status(400).json({ message: "ID inválido" });
   }

   const category = categories.find((c) => c.id === id);

   if (!category) {
       return res.status(404).json({ message: "Categoría no encontrada" });
   }

   res.json(category);
});


app.get('/categories', (req, res) => {
    res.json(categories);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});