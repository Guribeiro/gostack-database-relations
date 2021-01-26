import { v4 } from 'uuid';
import Costumer from '@modules/customers/infra/typeorm/entities/Customer';
import ICostumerResitory from '../ICustomersRepository';
import ICreateCustomerDTO from '../../dtos/ICreateCustomerDTO';

interface ICreateCustomerFakeDTO {
  id: string;
  name: string;
  email: string;
}

export default class FakeCostumerRepository implements ICostumerResitory {
  private costumers: Costumer[] = [];

  public async create({ name, email }: ICreateCustomerDTO): Promise<Costumer> {
    const costumer = new Costumer();

    Object.assign<Costumer, ICreateCustomerFakeDTO>(costumer, {
      id: v4(),
      email,
      name,
    });

    this.costumers.push(costumer);

    return costumer;
  }

  public async findByEmail(email: string): Promise<Costumer | undefined> {
    const findCostumer = this.costumers.find(
      costumer => costumer.email === email,
    );

    return findCostumer;
  }

  public async findById(id: string): Promise<Costumer | undefined> {
    const findCostumer = this.costumers.find(costumer => costumer.id === id);

    return findCostumer;
  }
}
