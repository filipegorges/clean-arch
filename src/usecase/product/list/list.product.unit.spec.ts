import ListProductUseCase from "./list.product";

describe("Test list products use case", () => {
  const product1 = {
    id: "123",
    name: "Product",
    price: 1,
  };
  const product2 = {
    id: "123",
    name: "Product",
    price: 1,
  };
  const mockRepository = () => ({
    find: jest.fn().mockReturnValue(Promise.resolve(product1)),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  });
  it("should list products", async () => {
    const productRepository = mockRepository();
    const usecase = new ListProductUseCase(productRepository);
    const expected = {
      products: [
        {
          id: "123",
          name: "Product",
          price: 1,
        },
        {
          id: "123",
          name: "Product",
          price: 1,
        },
      ],
    };
    const output = await usecase.execute({});
    expect(output).toEqual(expected);
  });
});
