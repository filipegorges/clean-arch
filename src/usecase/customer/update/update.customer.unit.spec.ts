import UpdateCustomerUseCase from "./update.customer";

describe("Test update customer use case", () => {
    const findRes = {
        id: "123",
        name: "John Doe",
        address: {
            street: "street",
            number: 1,
            zip: "zip",
            city: "city",
        }
    }
    const input = {
        id: "123",
        name: "John Doe Updated",
        address: {
            street: "street",
            number: 1,
            zip: "zip",
            city: "city",
        }
    }
    const mockRepository = () => {
        return {
            findAll: jest.fn(),
            create: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(findRes)),
            update: jest.fn().mockReturnValue(Promise.resolve(input)),
        };
    };

    it("should update a customer", async () => {
        const customerRepository = mockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);
        
        const output = await usecase.execute(input);
        expect(output).toEqual(input);

    });

});