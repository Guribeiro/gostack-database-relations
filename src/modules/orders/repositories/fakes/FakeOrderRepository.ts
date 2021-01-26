// import { v4 } from 'uuid';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IOrdersRepository from '../IOrdersRepository';
import ICreateOrderDTO from '../../dtos/ICreateOrderDTO';

interface IFakeCreateOrderDTO {
  id: string;
  customer: string;
  products: Product[];
}

export default class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign<Order, ICreateOrderDTO>(order, {
      customer,
      products,
    });

    this.orders.push(order);

    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const findOrder = this.orders.find(order => order.id === id);

    return findOrder;
  }
}
