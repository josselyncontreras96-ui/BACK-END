import * as http from "node:http";

const products = [
  { id: 1, name: "Mouse", price: 20 },
  { id: 2, name: "Laptop", price: 1200 },
];

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "API Running" }));
    return;
  }

  if (req.url === "/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
    return;
  }

  if (req.url.startsWith("/products/")) {
    const id = Number(req.url.split("/")[2]);

    const product = products.find((p) => p.id === id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Not Found" }));
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});