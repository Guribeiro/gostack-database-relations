import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const findCustomer = await this.customersRepository.findByEmail(email);

    if (findCustomer) {
      throw new AppError('email address is already been used');
    }

    const customer = await this.customersRepository.create({
      email,
      name,
    });

    return customer;
  }
}

export default CreateCustomerService;
