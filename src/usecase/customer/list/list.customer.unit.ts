import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer";

describe("Test list customer use case", () => {
    const customer1 = CustomerFactory.createWithAddress(
        "John Doe",
        new Address("street", 1, "zip", "city")
    );

    const customer2 = CustomerFactory.createWithAddress(
        "Jane Doe",
        new Address("street", 1, "zip", "city")
    );

    const mockRepository = () => ({
        find: jest.fn().mockReturnValue(Promise.resolve(customer1)),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn(),
    });

    it("should list customers", async () => {
        const customerRepository = mockRepository();
        const usecase = new ListCustomerUseCase(customerRepository);

        const expected = [
            {
                id: "123",
                name: "John Doe",
                address: {
                    street: "street",
                    number: 1,
                    city: "city",
                    zip: "zip",
                },
            },
            {
                id: "123",
                name: "Jane Doe",
                address: {
                    street: "street",
                    number: 1,
                    city: "city",
                    zip: "zip",
                },
            },
        ];

        const output = await usecase.execute({});
        expect(output).toEqual(expected);
    });
});
