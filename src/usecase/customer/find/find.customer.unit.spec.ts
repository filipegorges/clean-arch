import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("street", 1, "zip", "city");
customer.changeAddress(address);

const mockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = mockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    const input = {
      id: "123",
    };

    const expected = {
      id: "123",
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

  it("should not find a customer", async () => {
    const customerRepository = mockRepository();

    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const usecase = new FindCustomerUseCase(customerRepository);
    const input = {
      id: "123",
    };

    expect(usecase.execute(input)).rejects.toThrow("Customer not found")
  });
});
