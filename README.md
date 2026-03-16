# Api Tienda

## Base URL

http://localhost:3000

## Endpoint

### GET /ping

Verifica que la API esta funcionando.


#### Response 200

''' json
{
    "message : "pong"

}

''' 
#### GET /products
Devuelve la lista de productos.

[
  {
    "id": 1,
    "name": "Laptop",
    "price": 1200
  }
]

GET /products/:id
Devuelve un producto por id.
{
  "id": 1,
  "name": "Laptop",
  "price": 1200
}

Response 404
{
  "error": "Producto no encontrado"
}

POST /products
Crea un nuevo producto.

Body (JSON)
{
  "name": "Keyboard",
  "price": 50
}

Response 201
{
  "id": 3,
  "name": "Keyboard",
  "price": 50
}

Response 422
{
  "error": "name is required"
}

### PUT/PRODUCT

ACTUALIZAR PRODUCTO 

### Body (JSON)
{
  "name": "Keyboard",
  "price": 50
}


