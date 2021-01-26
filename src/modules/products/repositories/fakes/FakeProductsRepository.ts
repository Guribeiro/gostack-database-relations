import IProductsRepository from '../IProductsRepository';
// import CreateProductService from '../../services/CreateProductService';
// import IUpdateProductsQuantityDTO from '../../dtos/IUpdateProductsQuantityDTO';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';

import Product from '../../infra/typeorm/entities/Product';

export default class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign<Product, ICreateProductDTO>(product, {
      name,
      price,
      quantity,
    });

    this.products.push(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.name === name);
    return findProduct;
  }
}
