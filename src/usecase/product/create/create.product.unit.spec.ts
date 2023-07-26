import CreateProductUseCase from "./create.product";

describe("Test create product use case", () => {
    const product = {
        id: expect.any(String),
        name: "Product",
        price: 1,
    };
    const mockRepository = () => ({
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    });
    it("should create a product", async () => {
        const productRepository = mockRepository();
        const usecase = new CreateProductUseCase(productRepository);
        const input = {
            name: "Product",
            price: 1,
        };
        const output = await usecase.execute(input);
        expect(output).toEqual(product);
    });
    it("should not create a product", async () => {
        const productRepository = mockRepository();
        productRepository.create.mockImplementation(() => {
            throw new Error("Product not created");
        });
        const usecase = new CreateProductUseCase(productRepository);
        const input = {
            name: "Product",
            price: 1,
        };
        expect(usecase.execute(input)).rejects.toThrow("Product not created");
    });
});