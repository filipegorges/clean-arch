import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import FindProductUseCase from "./find.product";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Test find Product use case", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync()
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it("should find a Product", async () => {
        const product = new Product("123", "John Doe", 10);

        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const input = {
            id: "123"
        };

        const expected = {
            id: "123",
            name: "John Doe",
            price: 10,
        };

        const output = await new FindProductUseCase(productRepository).execute(input);
        expect(output).toEqual(expected);
    });
});