import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 10.0,
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(10.0);
  });

  it("should list products", async () => {
    await request(app).post("/product").send({
        name: "Product 1",
        price: 10.0,
    });
    await request(app).post("/product").send({
        name: "Product 2",
        price: 20.0,
    });
    const response = await request(app).get("/product");
    expect(response.status).toEqual(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0].name).toBe("Product 1");
    expect(response.body.products[1].name).toBe("Product 2");
  });
    
});
