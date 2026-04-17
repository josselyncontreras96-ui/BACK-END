import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

import Category from "../models/Category.js";

describe("Categories endpoint", () => {
  beforeEach(async function () {
    await Category.deleteMany({});

    await Category.create({
      name: "Electronics",
    });
  });

  it("Categoría debería tener un status 200 y un array", async function () {
    const res = await request(app).get("/categories");

    // console.log(res.status, res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
  });

  it("should return name categories ", async function () {
    const res = await request(app).get("/categories");

    expect(res.body[0]).to.have.property("name");
  });

  it("should create a new category and return it with a 201 status", async function () {
    const newCategory = {
      name: "Books",
      description: "All kinds of books",
    };

    const response = await request(app).post("/categories").send(newCategory);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name");
    expect(response.body.name).to.equal("Books");
  });

  // it("Debería traer una categoría por el ID", async function () {
  //   const category = await Category.findOne({ name: "Electronics" });

  //   const res = await request(app).get(`/categories/${category.id}`);

  //   expect(res.status).to.equal(200);
  //   expect(res.body).to.have.property("name");
  //   expect(res.body.name).to.equal("Electronics");
  // });

  it("Debería mostrar una categoría por su id", async function () {
    // const newCategory = {
    //   name: "Categoría",
    //   description: "Categoría de test",
    // };

    // const res = await request(app).post("/categories").send(newCategory);

    // expect(res.status).to.equal(201);
    // expect(res.body).to.have.property("name");
    // expect(res.body).to.have.property("description");
    // expect(res.body.name).to.equal("Categoría");
    // expect(res.body.description).to.equal("Categoría de test");

  const category = await Category.findOne({ name: "Electronics" });

  const response = await request(app).get(`/categories/${category._id}`);

  expect(response.status).to.equal(200);
  expect(response.body).to.have.property("name");
  expect(response.body.name).to.equal("Electronics");
});
  
it("Categories Deberia devolver 422 si falta el nombre", async function () {

  const newCategory = {
    description: "Productos de oficina"
  };

  const res = await request(app)
    .post("/categories")
    .send(newCategory);

  expect(res.status).to.equal(422);

});
it("Debería actualizar una categoría", async function () {

  const category = await Category.findOne();

  const updatedCategory = {
    name: "Categoría actualizada"
  };

  const res = await request(app)
    .put(`/categories/${category._id}`)
    .send(updatedCategory);

  expect(res.status).to.equal(200);
  expect(res.body.name).to.equal("Categoría actualizada");

});

it("Deberia borrar una categoria", async function () {

  const category = await Category.findOne();

  const res = await request(app)
    .delete(`/categories/${category._id}`);

  expect(res.status).to.equal(200);

});

it("Deberia devolver 404 si la categoria no existe", async function () {

  const fakeId = "507f1f77bcf86cd799439011";

  const res = await request(app)
    .delete(`/categories/${fakeId}`);

  expect(res.status).to.equal(404);

});

})
