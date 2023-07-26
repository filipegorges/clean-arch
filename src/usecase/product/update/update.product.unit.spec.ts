import UpdateProductUseCase from "./update.product";

describe("Test update product use case", () => {
    const mockRepository = () => ({
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    });

    const product = {
        id: expect.any(String),
        name: "Product",
        price: 1,
    };

    it("should update a product", async () => {
        const productRepository = mockRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const input = {
            id: product.id,
            name: "Product",
            price: 1,
        };
        const output = await usecase.execute(input);
        expect(output).toEqual(product);
    });

    it("should not update a product", async () => {
        const productRepository = mockRepository();
        productRepository.update.mockImplementation(() => {
            throw new Error("Product not updated");
        });
        const usecase = new UpdateProductUseCase(productRepository);
        const input = {
            id: product.id,
            name: "Product",
            price: 1,
        };
        expect(usecase.execute(input)).rejects.toThrow("Product not updated");
    });
});