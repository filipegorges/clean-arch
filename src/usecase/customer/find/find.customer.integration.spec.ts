import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync()
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it("should find a customer", async () => {
        const customer = new Customer("123", "John Doe");
        const address = new Address("street", 1, "zip", "city");
        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const input = {
            id: "123"
        };

        const expected = {
            id: "123",
            name: "John Doe",
            address: {
                street: "street",
                number: 1,
                city: "city",
                zip: "zip"
            }
        };

        const output = await new FindCustomerUseCase(customerRepository).execute(input);
        expect(output).toEqual(expected);
    });
});