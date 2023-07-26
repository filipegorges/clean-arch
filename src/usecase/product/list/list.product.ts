import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }
    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const response = await this.productRepository.findAll();
        const products = response.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
        }));
        return {
            products,
        }
    }
}