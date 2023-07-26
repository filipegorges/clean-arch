import FindProductUseCase from "./find.product";

describe("Test find product use case", () => {
    const product = {
        id: "123",
        name: "Product",
        price: 1,
    };

    const mockRepository = () => ({
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    });

    it("should find a product", async () => {
        const productRepository = mockRepository();
        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: "123",
        };

        const output = await usecase.execute(input);
        expect(output).toEqual(product);
    });


    it("should not find a product", async () => {
        const productRepository = mockRepository();

        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: "123",
        };

        expect(usecase.execute(input)).rejects.toThrow("Product not found")
    });
});