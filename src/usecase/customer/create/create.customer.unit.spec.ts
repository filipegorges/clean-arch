import CreateCustomerUseCase from "./create.customer";

describe("Test create customer use case", () => {
    const input = {
        name: "John Doe",
        address: {
            street: "street",
            number: 1,
            city: "city",
            zip: "zip",
        },
    };

    const mockRepository = () => ({
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    });

    it("should create a customer", async () => {
        const customerRepository = mockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const expected = {
            id: expect.any(String),
            name: "John Doe",
            address: {
                street: "street",
                number: 1,
                city: "city",
                zip: "zip",
            },
        };

        const output = await usecase.execute(input);
        expect(output).toEqual(expected);
    });

    it("should throw an error when name is missing", () => {
        const customerRepository = mockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "",
            address: {
                street: "street",
                number: 1,
                city: "city",
                zip: "zip",
            },
        };

        expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });
    
    it("should throw an error when street is missing", () => {
        const customerRepository = mockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "asd",
            address: {
                street: "",
                number: 1,
                city: "city",
                zip: "zip",
            },
        };

        expect(usecase.execute(input)).rejects.toThrow("Street is required");
    });
});